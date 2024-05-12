<template>
    <div class="mycontent">
      <div class="search">
        <div><el-span>关键词:</el-span><el-input v-model="query.key"></el-input></div>
        <div><el-span>作者:</el-span><el-input v-model="query.author"></el-input></div>
       <div> <el-span>开始时间</el-span>  <el-date-picker
      v-model="query.time"
      value-format="yyyy-MM-dd"
      
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker></div>
      <div> 
        <el-button type="primary" @click="search()">搜索</el-button>
        <el-button  @click="clear()">清空</el-button>
        <el-button type="success" @click="add()">添加</el-button>
      </div>
      </div>
      <el-table
      :data="list"
      stripe
      style="width:100%"
      >
      <el-table-column
        prop="title"
        label="标题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="simpleTitle"
        label="小标题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
       :show-overflow-tooltip="true"

        min-width="95"
        width="150">
      </el-table-column>
      <el-table-column
        
        label="标签"
        width="150">
        <template slot-scope="scope">
         <el-span v-for="(item,index) in scope.row.tag" :key="index" style="padding: 1px;">
           <el-tag size="medium">{{ item.typeName }}</el-tag>
         </el-span>
      </template>

      </el-table-column>
      <el-table-column
        prop="visit"
        label="浏览数"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="user.nickname"
        label="用户名"
        width="150"
        >
      </el-table-column>
    
  
      <el-table-column label="操作" row-key="id" >
        <template slot-scope="scope">
          <el-button type="success" @click.native.prevent="update(scope.$index, scope.row)">修改</el-button>
          <el-button type="danger" @click.native.prevent="del(scope.$index, scope.row)">删除</el-button>  
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center"
      background
      :page-size = "7"
      layout="prev, pager, next"
      
      @current-change="topage"
      
      :total=allItem.length>
    </el-pagination>
    </div>
</template>

<script>
import request from '../utils/request'
export default {
  name:"contents",
      data() {
        return {
          list: {},
          allItem:{},
          key:1,
          curr:1,
          query:{
            key:'',
            author:'',
            startTime:'',
            endTime:'',
            time:'',
            pageSize:7,
            pageNum:1
          },
          
        }
      },
      watch:{
        curr(n,o){
          this.list = this.allItem.slice((this.curr-1)*7,(this.curr-1)*7+7);
        },
        allItem(){
          this.list = this.allItem.slice((this.curr-1)*7,(this.curr-1)*7+7);
        },
    },
      created() {     
        this.init()
      },
      methods:{  
          init(){
            request.get('/blog').then((res) =>{
              this.list = res.data.slice(0,8)
                this.allItem = res.data
                
            }).catch((e) =>{
              this.$message.error("网络异常,请稍后再试");
            })
          },
          topage(val){
           console.log(val)
           this.curr = val;
           this.query.pageNum = val;
           this.search(val)
          },
          search(val) {
            console.log(val)
            if(val != null){
              this.query.pageNum = val
            }
            if(this.query.time != ''){
              this.query.startTime = this.query.time[0]
              this.query.endTime = this.query.time[1]
            }
           
            
            request.get('/blog/list?key='+this.query.key+
            '&author='+this.query.author+'&startTime='+this.query.startTime+'&endTime='+this.query.endTime+
          '&pageSize=' +this.query.pageSize+'&pageNum='+this.query.pageNum).then((res) =>{
              this.list = res.data.records
            }).catch((e) =>{
              this.$message.error("网络异常,查询失败,请稍后再试")
            })
         },
          del(index, row) {
            request.post('/blog/del?bid='+row.bid).then((res)=>{
                this.$message.success("删除成功")
                this.allItem = this.removeItem(this.allItem,row)
                // console.log(this.blog)
            }).catch((e)=>{
              this.$message.error("删除失败，网络异常")
            })
          },
            update(index,row){
              this.$router.push({path:'/blog/add',query:row});
              console.log(row)
            // this.$router.push({name:'blog',params:{blog:JSON.stringify(row)}})
          },
          clear(){
            this.clearValue(this.query)
            this.query.pageNum = 1
            this.query.pageSize = 7    
          },
          add(){
            this.$router.push({path:'/blog/add'})
          }
      }
}
</script>

<style scoped> 
  .mycontent{
    /* height: 100%; */
    background-color: white;
    height: calc(100vh - 108px );
    /* padding: ; */
    margin:0px 15px;
  }
  .mycontent .el-input{
    width: 200px;
  }
  .search{
    display: flex;
    align-items: center;
    gap:30px;
    justify-content: center;
    padding-top: 15px ;
    
  }
  .el-tooltip__popper {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 15;
      -webkit-box-orient: vertical;
    }
.el-pagination{
  margin-top: 10px;
}
</style>