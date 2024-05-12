<template>
    <div class="content">
      <el-span class="title" @click="back">返回</el-span>
     
      <div class="myform">
        
        <el-form :model="item" :rules="rules" ref="item" label-position="right"  label-width="80px">
          <el-form-item label="账号:" prop="username">
            <el-input v-model="item.username" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="item.password" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="昵称:" >
            <el-input v-model="item.nickname" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="item.email" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="头像:">
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:9000/upload"
              
              :file-list="item.userIcon"
              :on-success="upload"
              >
              <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload> 
          </el-form-item>
          <el-form-item label="用户类型:">
            <el-radio v-model="item.userType" label="1">管理员</el-radio>
            <el-radio v-model="item.userType" label="0">用户</el-radio>
          </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addTag">提交</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
        
      </div>
    </div>
  </template>
  
  <script>
  import request from '@/utils/request'
  
  export default {
    name: 'tag_add',
    data(){
      var validUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号不能为空'));
        }else if(value.length < 6 || value.length > 10){
            callback(new Error('用户名必须在6到10个字符之间'));
        }else{
            callback()
        }
         
        };
        var validPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        }else if(value.length < 6 || value.length > 10){
            callback(new Error('密码必须在6到10个字符之间'));
        }else{
            callback()
        }
        
    }

      return {
        
        item: {
          username: '', 
          password: '',
          nickname: '',
          email: '',
          userIcon: '',
          userType: ''
        },
        rules: {
          username: [
            { validator: validUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validPassword, trigger: 'blur' }
          ],
         
          
        }
      }
    },
    methods: {
      addTag() {
        // this.$router.push({ path: '/user/add' })
        this.$refs['item'].validate((valid) =>{
           if(valid){
            request.post('/user/add',this.item).then((res) =>{
            this.$message.success("添加成功")
            this.$router.push({path:'/user'})
            }).catch((e) =>{
                this.$message.error("网络延迟请稍后再试")
            }) 
           }else{
            this.$message.error("信息填写有误")
           }
        })
  
      },
      resetForm() {
        this.clearValue(this.item)
      },
      back(){
        this.$router.back(-1)
      },
      upload(response, file, fileList){
          
          this.item.userIcon = response.data
          
          this.$message.success("上传成功")
          var that = this;
          that.$forceUpdate();
      },
    },
    mounted() {
      if (this.$route.query != null) {
        // this.item = this.$route.query
        this.item = this.$route.query
      }
    }
  }
  </script>
  
  <style scoped>
  .content {
    background: white;
    margin: 50px;
    height: 75vh;
  }
  .title {
    display: block;
    padding: 15px;
    color: #409EFF;
  }
  .title:hover {
    cursor: pointer;
  }
  .myform {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .myform .el-input {
    width: 200px;
  }
  .dialog-footer {
    padding-bottom: 30px;
  }
  </style>
  