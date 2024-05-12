<template>
    <div class="mycontent">
      <el-container>
        <el-header>
          <Myheader/>
        </el-header>
        <el-container>
          <el-aside width="250px">
            <Menu/>
          </el-aside>
        
          <el-main>
            
              <Bread/>
              <Add/>
              
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script >
  import Menu from '@/components/menu.vue';
  import Bread from '@/components/bread.vue'
  import Myheader from '@/components/m_myheader.vue'
  import Add from '@/components/friendlink_add.vue';
  export default{
    name:'home',
    components:{
      Menu,
      Bread,
     
      Myheader,
        Add
    }
  }
  </script>
  
  <style scoped>
    /* .mycontent{
      height: 100vh;
    } */
    .el-header{
      background-color: #409EFF;
      color: #fffefe;
      text-align: center;
      line-height: 60px;
    }
    
    .el-aside {
      background-color: #324057;
      color: #ffffff;
      text-align: center;
      height: calc(100vh - 60px);
    }
    
    .el-main {
      /* background-color: aqua; */
      background-color: #E9EEF3;
      /* color: #ffffff; */
      /* text-align: center; */
      /* line-height: 160px; */
      height: calc(100vh - 60px );
      padding: 0px;
    }
    
    
  </style>