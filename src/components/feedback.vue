<template>
    <div class="myconent">
    
       <el-table
    :data="list"
    style="width: 100%">
   
    <el-table-column
      label="昵称"
      prop="nickname">
     
    </el-table-column>
     <el-table-column
      label="反馈内容"
      prop="message"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column
      label="反馈时间"
      width="200"
      prop="datetime">
    </el-table-column>
    
    <el-table-column
      label="操作"
      width="300"
      >
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)">回复</el-button>
        -->
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
        :page-size = 10
        @current-change="topage"
        
        :total="allItem.length">
      </el-pagination>
    </div>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" >
      <el-form :model="from" label-width="100" size="small">
        <el-form-item label="用户名:">
          <el-input  :value="from"></el-input>
        </el-form-item>
        <el-form-item label="密 码:">
          <el-input  v-model="from"></el-input>
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
            pageSize:10,
            pageNum:1
          },
        from:{},
        dialogTableVisible: false,
        dialogFormVisible: false,

      }
    },
    watch:{
        curr(n,o){
          this.list = this.allItem.slice((this.curr-1)*10,(this.curr-1)*10+10);
        },
        allItem(){
          this.list = this.allItem.slice((this.curr-1)*10,(this.curr-1)*10+10);
        }
    },
    methods: {
      init(){
          
            request.get('/feedback/all').then((res) =>{
              this.list = res.data.slice(0,11)
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
            request.get('/feedback/list?key='+this.query.key+
            '&author='+this.query.author+'&startTime='+this.query.startTime+'&endTime='+this.query.endTime+
          '&pageSize=' +this.query.pageSize+'&pageNum='+this.query.pageNum).then((res) =>{
              this.list = res.data.records
            }).catch((e) =>{
              this.$message.error("网络异常,查询失败,请稍后再试")
            })
         },
          del(index, row) {
            request.post('/feedback/del?id='+row.id).then((res)=>{
                this.$message.success("删除成功")
                this.allItem = this.removeItem(this.allItem,row)
                // console.log(this.blog)
            }).catch((e)=>{
              this.$message.error("删除失败，网络异常")
            })
          },
            update(index,row){
              this.$router.push({path:'/feedback/add',query:row});
              console.log(row)
            // this.$router.push({name:'blog',params:{blog:JSON.stringify(row)}})
          },
          clear(){
            this.clearValue(this.query)
            this.query.pageNum = 1
            this.query.pageSize = 10    
          },
          
          handleEdit(v,row){
            this.dialogTableVisible = true
          },
          
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