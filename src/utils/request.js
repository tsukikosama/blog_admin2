import axios from 'axios'
 
import Vue from 'vue'

 
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Loading} from 'element-ui'
//修改原型链，全局使用axios,这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios=axios
// 安装各类插件
Vue.use(elementui)
 const request = axios.create({
    // baseURL: 'http://8.138.16.124:9000',
    baseURL: 'http://localhost:9000',  // 注意！！ 这里是全局统一加上了 后端接口前缀 前缀，后端必须进行跨域配置！
     timeout: 5000
 })

 let loading;
//内存中正在请求的数量
let loadingNum=0;
function startLoading() {    
	if(loadingNum==0){
		loading = Loading.service({
		  lock: true,
		  text: '拼命加载中...',
		  background:'rgba(255,255,255,0.5)',
		})
	}
	//请求数量加1
	loadingNum++;
}

function endLoading() {
    //请求数量减1
	loadingNum--
	if(loadingNum<=0){
		loading.close()
	}
}
 // request 拦截器
 // 可以自请求发送前对请求做一些处理
 // 比如统一加token，对请求参数统一加密
 request.interceptors.request.use(config => {
    startLoading();
     config.headers['Content-Type'] = 'application/json;charset=utf-8';
   
  // config.headers['token'] = user.token;  // 设置请求头
     return config
 }, error => {
     return Promise.reject(error)
 });
 // response 拦截器
 // 可以在接口响应后统一处理结果
 request.interceptors.response.use(
     response => {
        endLoading();
         let res = response.data;
         // 如果是返回的文件
         if (response.config.responseType === 'blob') {
             return res
         }
         // 兼容服务端返回的字符串数据
         if (typeof res === 'string') {
             res = res ? JSON.parse(res) : res
         }
         return res;
     },
     error => {
        endLoading();
         console.log('err' + error) // for debug
         return Promise.reject(error)
     }
 )
 export default request
