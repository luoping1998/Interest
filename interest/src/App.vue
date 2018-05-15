<template>
  <div id="app">
    <router-view @toshow = "toshow" @show="toshow"/>
    <s-footer v-show="show"></s-footer>
  </div>
</template>

<script>
import sFooter from './components/footer.vue'
export default {
  name: 'App',
  components : {
    sFooter
  },
  data : function() {
    return {
      show : false
    }
  },
  mounted() {
    this.$http.post('http://localhost:8000/users/',{}, { emulateJSON : true,withCredentials: true}).then(function(res) {
      if(!res.body.error) {
        this.show = true;
        sessionStorage.setItem('user',JSON.stringify(res.body.infor));
      }else{
        this.show = false;
      }
    })
  },
  methods : {
    toshow(){
      this.show = true;
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

a {
  display:block;
  text-decoration: none; 
 }
 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  font-size: 16px;
}
</style>
