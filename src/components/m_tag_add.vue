<template>
  <div class="content">
    <el-span class="titile" @click="back">返回</el-span>
    <div class="myfrom">
   
   <el-form >
     <el-span>标签名:</el-span>&emsp;
     <el-input v-model="item.typeName" autocomplete="off"></el-input>  
   </el-form>
     <div slot="footer" class="dialog-footer">
   
     <el-button type="primary" @click="addTag" >提 交</el-button>
   </div>


</div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'tag_add',
    data(){
        return{
            
            
            item:{}
        }
    },
    methods:{
      addTag(){
            
            this.dialogFormVisible = false
            request.post('/tag/add',this.item).then((res)=>{
                this.$message.success("添加成功");
                this.$router.push({path:'/tag'})
            }).catch((e)=>{

            })
          },
          back(){
            this.$router.back(-1)
          }
    },
    mounted(){
      if(this.$route.query != null){
        this.item = this.$route.query
      }
        // console.log(this.$store.state.item)
    }
}
</script>

<style scoped>
  .content{
    background: white;
    margin: 50px;
    /* padding-top: 50px ; */
    height: 70vh;
  }
  .titile{
    display: block;
    padding: 15px;
    color: #409EFF;
  }
  .titile:hover{
    cursor: pointer;
  }
  .myfrom{
    padding-top: 25px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .myfrom .el-input{
    width: 200px;
  }
  .dialog-footer{
    margin-top: 30px;
    padding-bottom: 30px ;
  }
</style>