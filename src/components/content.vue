<template>
  <el-container>
      <el-header>cc的博客后台</el-header>
      <el-container >
        <el-aside >
          <menus/>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

import menus from './menu.vue'
export default {
    data:{
        return(){
            user:;
        }
    },
    components:{
        menus
    },
    mounted(){
       var username = this.$store.state.user
       this.$message.success("亲爱的:"+username+"欢迎回来");
    }

}
</script>

<style scoped>
    
.el-header, .el-footer {
    background-color: #2576de;
    color: rgb(0, 0, 0);
    text-align: center;
    font-size: 24px;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #7a7b7c;
    color: rgb(255, 246, 246);
    text-align: center;
    line-height: 200px !important;
    width: 250px !important;  
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    
    line-height: 160px;
    padding: 0px;
    height: 680px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
    /* height: 100%; */
  }
  .el-container{
    height: 680px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  *{
      margin: 0px;
      padding: 0px;
    }
</style>