<template>
  <div class="mycontent">
      <Login/>
  </div>
</template>


<script>
import Login from '../components/m_login.vue'
export default {
  name: 'login',
  components: {
    Login
  },

}
</script>

<style scoped>
  .mycontent{
    min-height: 100vh;
    height: 100vh;
   
    background: url(../images/bg.png);
    background-size: 100%;
  }
  
</style>