<template>
  <div class="myheader">
    <el-span>
        迷途川博客后台管理系统
    </el-span>
    <div class="left">
        
      
            <el-button type="text" size="small" @click="callme()" class="btn">问题反馈</el-button>
            <el-avatar :src=this.$store.state.user.userIcon></el-avatar>
            <el-span></el-span>
            <el-button type="text" size="small"  class="el-icon-switch-button btn"  @click="logout()">退出登录</el-button>
       
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        callme(){
            this.$alert('有问题联系QQ:1083344129', '消息', {
            confirmButtonText: '确定',
         
            });
        },
        logout(){
            this.$store.commit('logout')
            this.$router.push({path:'/'})
        }
    }
}
</script>

<style scoped>
    .myheader{
        display: flex;
        justify-content: space-between;
    }
    .btn{
        color: white;
        cursor: pointer;
    }
    .avatar{
        /* height: 40px; */
        text-align: center;
    }
    .left{
        display: flex;
        align-items: center;
        gap: 20px;
    }

</style>