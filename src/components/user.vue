<template>
    <div class="myconent">
      
     <div class="search">
        <div>
          <el-span>用户名:</el-span><el-input v-model="query.key"></el-input>
        </div>
        <div>
          <el-span>注册时间:</el-span>
          <el-date-picker
            v-model="query.time"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div>
          <el-button type="primary" @click="search()">搜索</el-button>
        <el-button type="error" @click = clear()>清空</el-button>
        <el-button type="success" @click="add()">添加</el-button>
        </div>
        

     </div>
    
       <el-table
    :data="list"
    style="width: 100%">
   
    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>
     <el-table-column
      label="密码"
      prop="password"
      >
    </el-table-column>
    <el-table-column
      label="昵称"
      prop="nickname">
    </el-table-column>
     <el-table-column
      label="创建时间"
      prop="createTime">
    </el-table-column>
    <el-table-column
      label="用户类型"
      prop="userType">
      <template slot-scope="scope">
        <el-span v-if="scope.row.userType == 1">管理员</el-span>
        <el-span v-else>用户</el-span>
      </template>
    </el-table-column>
    <el-table-column
      label="账号状态"
      prop="ban">
      <template slot-scope="scope">
        <el-span v-if="scope.row.isValid == 0">异常 </el-span>
        <el-span v-else>正常</el-span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="300"
      >
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
          <el-button
          size="mini"
          type="danger"
          v-if="scope.row.ban ==1"
          @click="ban(scope.$index, scope.row,0)">禁用</el-button>
          <el-button
          size="mini"
          type="success"
          v-else
          @click="ban(scope.$index, scope.row,1)">解禁</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="del(scope.$index, scope.row)">删除</el-button>
          
      </template>
    </el-table-column>
   
  </el-table>
    <div id="divs">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size = 7
        @current-change="topage"
        
        :total="allItem.length">
      </el-pagination>
    </div>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" >
      <el-form :model="from" label-width="100" size="small">
        <el-form-item label="用户名:">
          <el-input  :value="from.username"></el-input>
        </el-form-item>
        <el-form-item label="密 码:">
          <el-input  v-model="from.password"></el-input>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import request from '../utils/request'
export default {
    mounted(){
       this.init()
    },
       data() {
      return {
        list: {},
        allItem:{},
      
      
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
        from:{},
        dialogTableVisible: false,
        dialogFormVisible: false,

      }
    },
    watch:{
        curr(n,o){
          this.list = this.allItem.slice((this.curr-1)*7,(this.curr-1)*7+7);
        },
        allItem(){
          this.list = this.allItem.slice((this.curr-1)*7,(this.curr-1)*7+7);
        }
    },
    methods: {
      init(){
          
            request.get('/user/all').then((res) =>{
              this.list = res.data.slice(0,8)
                this.allItem = res.data
                
            }).catch((e) =>{
              this.$message.error("网络异常,请稍后再试");
            })
          },
          topage(val){
           this.curr = val;
           this.query.pageNum = val
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
            request.get('/user/list?key='+this.query.key+
            '&author='+this.query.author+'&startTime='+this.query.startTime+'&endTime='+this.query.endTime+
          '&pageSize=' +this.query.pageSize+'&pageNum='+this.query.pageNum).then((res) =>{
              this.list = res.data.records
            }).catch((e) =>{
              this.$message.error("网络异常,查询失败,请稍后再试")
            })
         },
          del(index, row) {
            request.post('/user/del?uid='+row.uid).then((res)=>{
                this.$message.success("删除成功")
                this.allItem = this.removeItem(this.allItem,row)
                // console.log(this.blog)
            }).catch((e)=>{
              this.$message.error("删除失败，网络异常")
            })
          },
            update(index,row){
              this.$router.push({path:'/user/add',query:row});
              console.log(row)
            // this.$router.push({name:'blog',params:{blog:JSON.stringify(row)}})
          },
          clear(){
            this.clearValue(this.query)
            this.query.pageNum = 1
            this.query.pageSize = 7    
          },
          add(){
            this.$router.push({path:'/user/add'})
          },
          handleEdit(v,row){
            this.$router.push({path:'/user/add',query:row})
          },
          ban(i,row,k){
            row.ban = k
            request.post('/user/update',row).then((res) =>{
              this.$message.success("修改成功")
            }).catch((e) =>[
              this.$message.error("网络异常")
            ])
          }
    },
  }

</script>

<style scoped>
  #divs{
    /* width: 100%; */
    text-align: center;
  }
  .el-input{
    width:300px;
    
  }
  
  .el-pagination{
     text-align: center;
  }
  .myconent{
    margin: 10px;
    background: white;
    padding: 10px;
  }
  .search{
    display: flex;
    gap: 50px;
    margin-bottom: 5px ;
    justify-content: space-between;
  }
</style>