<template>
    <div class="mycontent">
      <el-container>
        <el-header> <Myheader/></el-header>
        <el-container>
          <el-aside width="250px">
            <Menu/>
          </el-aside>
        
          <el-main>
            <div>
              <Bread/>
            </div>
            <div>
              <Tag_manager/>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script >
  import Menu from '@/components/menu.vue';
  import Bread from '@/components/bread.vue'
 
  import Tag_manager from '@/components/tag_manager.vue';
  import Myheader from '@/components/m_myheader.vue'
  export default{
    name:'home',
    components:{
      Menu,
      Bread,
      Myheader,
        Tag_manager
    }
  }
  </script>
  
  <style scoped>
    .mycontent{
      height: 100vh;
    }
    .el-header, .el-footer {
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
      background-color: #E9EEF3;
      /* color: #ffffff; */
      text-align: center;
      /* line-height: 160px; */
      height: calc(100vh - 60px);
      padding: 0px;
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  </style>