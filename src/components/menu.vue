<template>
    <div>
        <el-col :span="12">
        <el-menu
        default-active="0"
        class="el-menu-vertical-demo"  
        background-color="#324057"
        text-color="#fff"
        router="true"
        active-text-color="orange">
        <el-menu-item index="/home" >
            <i class="el-icon-menu"></i>
            <span slot="title" >博客管理</span>
        </el-menu-item>
        <el-menu-item index="/user" >
            <i class="el-icon-user"></i>
            <span slot="title" >用户管理</span>
        </el-menu-item>
        <el-menu-item index="/tag" >
            <i class="el-icon-document"></i>
            <span slot="title" >标签管理</span>
        </el-menu-item>
        <el-menu-item index="/review" >
            <i class="el-icon-s-promotion" ></i>
            <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/task" >
            <i class="el-icon-tickets" ></i>
            <span slot="title">任务管理</span>
        </el-menu-item>
        <el-menu-item index="/feedback" >
            <i class="el-icon-setting" ></i>
            <span slot="title">反馈管理</span>
        </el-menu-item>
        <el-menu-item index="/friendlink" >
            <i class="el-icon-wallet" ></i>
            <span slot="title">友链管理</span>
        </el-menu-item>
        </el-menu>
    </el-col>
    </div>
</template>

<script>
export default {
     methods: {
      
    }
}
</script>

<style scoped>
    .el-col{
        /* height: 100vh; */
    }
    div{
        width: 100%;
       
        /* height: 1000px; */
    }
   
</style>