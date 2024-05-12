//导入vuerouter
import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from '../vuex/index'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router =  new VueRouter({
   
    // 配置路由规则
    routes: [
        {
            path:'/',
            name:'登录',
            component:()=>import('../pages/login.vue'),    
        },
        {
            path: '/home',
            name: '主页',
            component:()=>import('../pages/index.vue'),
            meta:{
                requireAuth: true
            },    
        },
        {
            path:'/tag',
            name:'标签',
            component: ()=>import('../pages/tag.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 1
            }
        },
        {   
            path:'/blog/add',
            name:'博客添加',
            component:()=>import('../pages/blog_add.vue') ,
            meta:{
                requireAuth: true,
                breadNumber: 2
            }       
        },
        {   
            path:'/tag/add',
            name:'标签添加',
            component:()=>import('../pages/tag_add.vue') ,
            meta:{
                requireAuth: true,
                breadNumber: 3
            }       
        },
        {
            path:'/user',
            name:"用户列表",
            component:()=>import('../pages/user.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 4
            }
        },
        {
            path:'/user/add',
            name:"用户添加",
            component:()=>import('../pages/user_add.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 5
            }
        },
        {
            path:'/review',
            name:"博客",
            component:()=>import('../pages/review.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 6
            }
        },
        {
            path:'/review/add',
            name:"博客",
            component:()=>import('../pages/review_add.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 7
            }
        },
        {
            path:'/task',
            name:"任务",
            component:()=>import('../pages/task.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 8
            }
        },
        {
            path:'/task/add',
            name:"任务",
            component:()=>import('../pages/task_add.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 9
            }
        },
        {
            path:'/feedback',
            name:"反馈",
            component:()=>import('../pages/feedback.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 10
            }
        },
        {
            path:'/friendlink',
            name:"友链",
            component:()=>import('../pages/friendlink.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 11
            }
        },
        {
            path:'/friendlink/add',
            name:"友链",
            component:()=>import('../pages/friendlink_add.vue'),
            meta:{
                requireAuth: true,
                breadNumber: 12
            }
        }
    ]
});
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
       
        // if(to.matched)
                if(to.fullPath == "/"){
                    
                    next()
                }else{
                    //需要登录才能访问的路由
                    if (vuex.state.user == undefined || vuex.state.user == null) {
                        // 用户未登录，重定向到登录页面
                        next('/');
                    } else {
                        // 用户已登录，继续访问
                        next();
                    }
                }
        
      
     
  });
export default router;