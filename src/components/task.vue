<template>
    <div class="myconent">
      <div class="btn">
        <el-button @click="add" type="primary">添加</el-button>
      </div>
       <el-table
    :data="list"
    style="width: 100%">
   
    <el-table-column
      label="时间轴"
      prop="moduleName">
    </el-table-column>
     <el-table-column
      label="完成时间"
      prop="date"
      >
    </el-table-column>
    <el-table-column
      label="当前状态"
      prop="moduleType">
      <template slot-scope="scope">
        <el-span v-if="scope.row.moduleType == 1">完成</el-span>
        <el-span v-else>未完成</el-span>
      </template>
    </el-table-column>

    <el-table-column
      label="操作"
      width="300"
      >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          v-if="scope.row.moduleType == 0"
          @click="ban(scope.$index, scope.row,1)">完成</el-button>
          <el-button
          size="mini"
          type="info"
          v-else
          @click="ban(scope.$index, scope.row,0)">未完成</el-button>
        
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
import dayjs from 'dayjs'
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
          
            request.get('/module/get').then((res) =>{
              this.list = res.data.slice(0,10)
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
            request.get('/module/list?key='+this.query.key+
            '&author='+this.query.author+'&startTime='+this.query.startTime+'&endTime='+this.query.endTime+
          '&pageSize=' +this.query.pageSize+'&pageNum='+this.query.pageNum).then((res) =>{
              this.list = res.data.records
            }).catch((e) =>{
              this.$message.error("网络异常,查询失败,请稍后再试")
            })
         },
          del(index, row) {
            request.post('/module/del?id='+row.id).then((res)=>{
                this.$message.success("删除成功")
                this.allItem = this.removeItem(this.allItem,row)
                // console.log(this.blog)
            }).catch((e)=>{
              this.$message.error("删除失败，网络异常")
            })
          },
            update(index,row){
              this.$router.push({path:'/task/add',query:row});
              console.log(row)
            // this.$router.push({name:'blog',params:{blog:JSON.stringify(row)}})
          },
          clear(){
            this.clearValue(this.query)
            this.query.pageNum = 1
            this.query.pageSize = 7    
          },
          add(){
            this.$router.push({path:'/task/add'})
          },
          handleEdit(v,row){
            this.$router.push({path:'/task/add',query:row})
          },
          ban(i,row,k){
            row.moduleType = k
            console.log(dayjs().format('YYYY-MM-DD'))
            row.date = dayjs().format('YYYY-MM-DD')
            request.post('/module/update',row).then((res) =>{
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
  .btn{
    display: flex;
    justify-content: flex-end;
  }
</style>