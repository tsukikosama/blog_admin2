<template :key="key">
       <div class="markdown" >
          <el-span>标签:</el-span>
          <el-select  v-model="tag"
          multiple placeholder="请选择添加的标签">
            <el-option       
              v-for="item in options"
              :key="item.typeName"
              :label="item.typeName"
              :value="item.id">
            </el-option>
         </el-select>
         <el-span>标题:</el-span>
         <el-input
        placeholder="请输入博客标题"
        v-model="blog.title"
        clearable>
      </el-input>
      <el-span>描述:</el-span>
         <el-input
        placeholder="请输入博客描述"
        v-model="blog.simpleTitle"
        clearable>
      </el-input>
      
      
        <div class="upload">
          <div>
            <el-span>图片:</el-span>
            <el-input   
              placeholder="首图地址"
              v-model="blog.picture"
              clearable
              >
              </el-input> 
          </div>
              <el-upload
              class="upload-demo"
              action="http://127.0.0.1:9000/upload"
              :show-file-list="false"
              :on-success="upload"
              >
              <el-button size="small" type="primary" >点击上传</el-button>
            </el-upload>          
            
        </div>
        
        <!-- 弃用的富文本 -->
        <!-- <div >
          <MarkdownPro 
          on-upload-image
           @upload-image="handleUploadImage"
          :height=500 v-model:value="blog.content"/>
        <el-button type="primary" id="mybutton" @click="submit(0)">保存</el-button>
        <el-button type="info" @click="submit(1)">发布</el-button>

       
  
        </div> -->
         <!-- 富文本编辑器 -->
          <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
            
        />  
        <Editor 
        class="editor"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
        
    
        </div>
        <div class="btn">
          <el-button type="primary" id="mybutton" @click="submit(0)">保存</el-button>
        <el-button type="success" @click="submit(1)">发布</el-button>
        </div>
    </div>     

</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { MarkdownPro } from 'vue-meditor'
import request from '../utils/request'
export default {
   name: "add",
        components: {
            // MarkdownPro,
            Editor, Toolbar
        },
        
    data(){
      return{
        blog:{
          
        }, 
        tag:[],
        options: [],
        selected:{},
        key:1,
        editor: null,
            html: '',
            toolbarConfig: { },
            editorConfig: { 
                          placeholder: '请输入内容...',
                          MENU_CONF:{
                            uploadImage:{
                              fieldName:'file',
                              withCredentials: true,
                              
                              // 本地地址
                              server: "http://127.0.0.1:9000/upload/edit/upload",
                              // 服务器地知
                              // server: "http://139.159.252.234:9000/upload/edit/upload"
                              onSuccess(file, res) {          // JS 语法
                                  console.log(file)
                                  
                              },
                              customBrowseAndUpload(insertFn) {              // JS 语法
                                        // 自己选择文件
                                        // 自己上传文件，并得到图片 url alt href
                                        // 最后插入图片
                                      insertFn(url, alt, href)
                              }
                            },
                            // customBrowseAndUpload(insertFn: InsertFnType) {   // TS 语法
                            // customBrowseAndUpload(insertFn) {              // JS 语法
                            //     // 自己选择文件
                            //     // 自己上传文件，并得到图片 url alt href
                            //     // 最后插入图片
                            //     insertFn(url, alt, href)
                                
                            // },
                            // onSuccess(file: File, res: any) {  // TS 语法
                              // onSuccess(file, res) {          // JS 语法
                              //     let s = document.getElementById(file.id);
                                  
                              //     console.log(`${file.name} 上传成功`, res)
                              // },
                            
                          }

           },
            mode: 'default', // or 'simple'
      }
    },
    mounted(){
         // 模拟 ajax 请求，异步渲染编辑器
       

        request.get("/tag/tags").then((res)=>{
            this.options = res.data;
        }).catch((e)=>{
            this.$message.error('搜索失败')
        })
        if(this.$route.query != null){
          this.blog = this.$route.query
          // console.log(this.$route.query.tag)
          this.tag = this.$route.query.tag.map(item => item.id)
          setTimeout(() => {
            this.html = this.$route.query.content
        }, 10)
          // this.tag = this.$route.query.tag
          // this.tag = this.$route.query.tag ;
        }

    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    
    methods:{     
      onCreated(editor) {      
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错   
      },
      
      submit(d){
          console.log(d)
          let s = this.tag.toString()
          if(this.blog.uid == ''){
            this.blog.uid = this.$store.state.user.uid
          }
          this.blog.tid = s
          // 获取纯文本
          let texts = this.editor.getText();
          this.blog.content = texts
          this.blog.isValid = d
          this.blog.uid = this.
          // this.blog.user =  this.$store.state.user
          request.post("/blog/add",this.blog).then((res)=>{
              // this.blog = null;
              this.$message.success('添加成功')
              this.$router.push({path:'/home'})
          }).catch((e) =>{
            this.$message.error("提交失败");
          })

      },
      upload(response, file, fileList){
          
          this.blog.picture = response.data
          
          this.$message.success("上传成功")
          var that = this;
          that.$forceUpdate();
      }},
    
      
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>

  .content{
    width: 100%;
    height: 100%;
  }
  /* .clear:after{
    clear: both;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  } */
  /*#mybutton{
    /* margin-top: 30px; 
    /* margin-left: 40% ; 
  }
  .markdown{
     /* height: 680px;  
  }
  .el-upload{
    /* float: right ; 
  }*/
  .el-input{
    width: 250px;
    margin: 5px;
    /* display: block; */
  }
  .editor{
    height: 350px;
  }
  .btn{
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 15px ;
  }
  .upload{
    display: flex;
    align-items: center;
    gap: 50px;
  }
  .upload .el-input{
    width: 250px;
  }
</style>