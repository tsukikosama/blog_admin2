<template>
    <div class="content">
      <el-span class="title" @click="back">返回</el-span>
     
      <div class="myform">
        
        <el-form :model="item"   label-position="right"  label-width="120px">
          <el-form-item label="添加新的板块:" >
            <el-input v-model="item.username" autocomplete="off"></el-input>  
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
      
      return {
        
        item: {
         
        },
        
      }
    },
    methods: {
      addTag() {
        // this.$router.push({ path: '/user/add' })
       
        request.post('/module/add',this.item).then((res) =>{
            this.$message.success("回复成功")
            this.$router.push('/review')
        }).catch((e) =>{
            this.$message.error("网络异常")
        })
      },
      resetForm() {
        this.clearValue(this.item)
      },
      back(){
        this.$router.back(-1)
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
  