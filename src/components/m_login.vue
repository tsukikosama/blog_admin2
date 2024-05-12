<template>
    <div class="login_container" style="height:100px">
    <div class="login_box">
    <!-- 登陆表单区域 -->
    <el-form ref="loginFormRef" :model="loginFrom" :rules="LoginfromRules"   label-width="0px" class="login_form">
        <!-- 用戶名 -->
      <el-form-item prop="username" >
         <el-input  v-model="loginFrom.username" placeholder="用户名" >
         </el-input>
      </el-form-item>
      <!-- 密碼 -->
        <el-form-item prop="password">
         <el-input v-model="loginFrom.password" type="password" placeholder="密码">
         </el-input>
      </el-form-item>
      <!-- 按鈕 -->
        <el-form-item  class="btns">
         <el-button type="primary" @click="login">登录</el-button>
         <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</div>
</template>

<script>
import request from '../utils/request'
export default {
  name:'m_login',
     data(){
        return{
            loginFrom:{
                username:'',
                password:''
            },
             LoginfromRules:{
                   // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]

    }
        }
    },
    methods:{
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){
            request.post('/user/login',this.loginFrom).then((res) =>{
                 console.log(res)   
                //  window.sessionStorage.setItem('user',JSON.parse(res.data));
                 this.$store.commit('login',res.data)
                 this.$router.push({path:'/home'});
            }).catch((e)=>{
                this.$message.error('登录失败')
            })
        }
    }
}
</script>

<style  scoped>
    .login_container{

   
}
.login_box{
    width: 450px;
    height: 240px;
    background-color: rgba(255, 255, 255, 0.418);
    border-radius:5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

}
.btns{
    display: flex;
    justify-content: center;
}
</style>