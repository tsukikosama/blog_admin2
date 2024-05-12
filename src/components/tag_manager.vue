<template>
     <div>
           <el-table
           ref="singleTable"
            highlight-current-row
      :data="tag"
      style="width: 100%">
     
      <el-table-column
        prop="typeName"
        label="标题"
        width="600">
      </el-table-column>
      
     <el-table-column label="操作" row-key="id"  >
        <template slot-scope="scope">
          <el-button type="primary"  @click.native.prevent="show(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" @click.native.prevent="del(scope.$index, scope.row)">删除</el-button>      
        </template>
      </el-table-column>
      
       <el-table-column
        
       
        width="180">
         <template slot="header" slot-scope="scope">
           <el-button    @click="add()"  >添加</el-button>
        </template>
      </el-table-column>
      
    </el-table>
    <div>
        <el-pagination
        background
        layout="prev, pager, next"
        :total=page
        :page-size=8
        @current-change="topage"
        >
    </el-pagination>
     
    </div>
      
       
    </div>
</template>

<script>
import request from '../utils/request'
export default {
    data() {
        return {
          tag: {
            
          },
          item: {
          typeName: '',
          
        },
        page:"",
        formLabelWidth: '120px',
       
        dialogFormVisible: false,
      }
      },
      
      mounted(){

        request.get('/tag').then((res) =>{
          // console.log(res)
              this.tag = res.data.records;
              this.page = res.data.total
              // this.$message.success("测试");
        }).catch((e)=>{
              this.$message.error("获取失败,网络异常")
        })
      },
          methods:{
            show(d1,row){
                this.$router.push({path:'/tag/add',query:row})
            },
         
          del(index, row) {
            request.post('/tag/del?id='+row.id,{id:row.id}).then((res)=>{
                 this.$message.success(res.data)
                 this.tag.splice(index,1);
            }).catch((e)=>{

            })
          },
          topage(current){
               request.get('/tag?current='+current).then((res)=>{
                  console.log(res);
                   this.tag = res.data.records;
               }).catch((e)=>{
                 this.$message.error(e)
               })
          },
          add(){
            this.$router.push({path:'/tag/add'})
          }
          
          
          
      }
}
</script>

<style scoped>
  
  .el-input{
    width:300px;
    height: 100vh;
  }
  
  .el-pagination{
     text-align: center;
  }
</style>