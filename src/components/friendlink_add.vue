<template>
    <div class="content">
      <el-span class="title" @click="back">返回</el-span>
     
      <div class="myform">
        
        <el-form :model="item"   label-position="right"  label-width="120px">
          <el-form-item label="网站名字:" >
            <el-input v-model="item.webName" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="网站描述:" >
            <el-input v-model="item.webDescript" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="网站地址:" >
            <el-input v-model="item.webUrl" autocomplete="off"></el-input>  
          </el-form-item>
          
          <el-form-item label="站主联系方式:" >
            <el-input v-model="item.webEmail" autocomplete="off"></el-input>  
          </el-form-item>
          <el-form-item label="网站图片:" >
           
              <el-upload
              class="upload-demo"
              action="http://127.0.0.1:9000/upload"
              
              :on-success="upload"
              >
              <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">提交</el-button>
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
      add(){
        // this.$router.push({ path: '/user/add' })
        this.item.webAccess = 0
        request.post('/friendlink/save',this.item).then((res) =>{
            // this.$message.success("添加成功")
            this.$router.push('/friendlink')
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
      upload(response, file, fileList){
          
          this.item.webImg = response.data
          
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
  