<template>
    <div class="content">
      <el-span class="title" @click="back">返回</el-span>
     
      <div class="myform">
        
        <el-form :model="item" :rules="rules" ref="item" label-position="right"  label-width="80px">
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="item.username" autocomplete="off" disabled></el-input>  
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <el-input v-model="item.content" autocomplete="off" disabled></el-input>  
          </el-form-item>
          <el-form-item label="回复内容:" >
            <el-input v-model="item.content1" autocomplete="off"></el-input>  
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
        save:{

        }
      }
    },
    methods: {
      addTag() {
        // this.$router.push({ path: '/user/add' })
        this.save.rid = this.item.id;
        this.save.likes = "0",
        this.save.content = this.item.content1;
        this.save.uid = this.$store.state.user.uid
        this.save.bid = this.item.bid
        this.save.reply = 1
        this.save.username = this.$store.state.user.nickname
        request.post('/review/addreview',this.save).then((res) =>{
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
  