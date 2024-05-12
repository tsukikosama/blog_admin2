<template>

  <div class="br">
    <KeepAlive>
      <div class="bread">
   <!--面包屑-->
  <el-breadcrumb class="breadcrumb" separator="/">
    <!--默认给一个首页的跳转，如果不需要可以去掉-->
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <!--面包屑列表-->
    <el-breadcrumb-item
      v-for='(item,index) in breadList'
      :key='index'
      @click.native="breadcrumbClick(item)"
      v-if='item.name' style="cursor: pointer">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</div>
    </KeepAlive>
  </div>


</template>
<script>
export default {
  data () {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    // 监听路由的变化
    $route (router) {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb () {
      let that = this;
      // 由于本项目大部分属于‘一级’页面，所以在设置路由时候，一级页面不设置breadNumber = 1，‘二级’页面以上才设置breadNumber
      let breadNumber = typeof (this.$route.meta.breadNumber) !== 'undefined' ? this.$route.meta.breadNumber : 1;
      // 获取当前页面的名字和路由，并组合成新的对象
      let newBread = {name: this.$route.name, path: this.$route.fullPath};
      let vuexBreadList = []; // 默认初始化面包屑数据
      if (breadNumber !== 1) {
        // 当前面包屑breadNumber大于1时才会从vuex中获取值
        vuexBreadList = that.$store.state.breadListState; // 获取breadList数组
      }
      if (breadNumber < vuexBreadList.length) {
        // "回退"面包屑----判断条件：当前路由breadNumber小于vuexBreadList的长度
        vuexBreadList.splice(breadNumber - vuexBreadList.length, vuexBreadList.length - breadNumber);
      }
      if (breadNumber > vuexBreadList.length) {
        // 添加面包屑----判断条件：当前路由breadNumber大于vuexBreadList的长度
        vuexBreadList.push(newBread);
      }
      // 处理完数据后，将最终的数据更新到vuex（用于页面刷新）
      that.$store.commit('breadListMutations', vuexBreadList);
      // 处理完数据后，将最终的数据更新为新的面包屑数组
      that.breadList = vuexBreadList;
    },
     breadcrumbClick (item) {
      this.$router.push({
        path: item.path
      })
    },
  },
   created() {
    this.getBreadcrumb();
  },
  getBreadcrumb(){
            ///拿到点击的路由路径
        let matched = this.$route.matched.filter(item=>item.meta&&item.meta.title);                
        this.breadList = matched.filter(item=>item.meta&&item.meta.title&&item.meta.breadList!==false) 
    },
}
</script>
<style scoped>
.br{
  /* display: flex; */
  /* margin-top: 20px; */
  /* width: 100vw; */
  height: 48px;
  width: 100%;
  display: flex;
}
.bread{
  width: calc( 100vw- 200px);
}
.bread  /deep/ .el-breadcrumb{
  
  display: inline-block;
  display: inline-block;
  height: 48px;
  vertical-align: top;
  line-height: 48px;
}
.bread /deep/ .is-link{
  font-weight: normal;
}
.bread{
  float:left;
  padding-left: 30px;
}
</style>
