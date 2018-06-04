<template>
  <div id="app">
    <pop v-show="popif" :words="popwords" :type="poptype"></pop>
    <router-view/>
  </div>
</template>

<script>
import {bus} from '../static/js/bus.js'
import pop from './components/pop.vue'
export default {
  name: 'App',
  created() {
    this.$http.get('http://localhost:8000/users/logif',{
      credentials : true
    }).then(function(res) {
        if(!res.body.error) {
          sessionStorage.setItem('user',JSON.stringify(res.body.infor));
          this.$router.push('/index/home');
        }else{
          this.$router.push('/login');
          sessionStorage.clear();
        }
    })
    var _this = this;
    bus.$on('pop',function(msg) {
      _this.popif = msg.popif;
      _this.popwords = msg.popwords;
      _this.poptype = msg.poptype;
    })
  },
  beforeDestroyed() {
    bus.$off('pop');
  },
  components : {
    pop
  },
  data() {
    return {
      popif : false,
      popwords :'',
      poptype : 0
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
  min-height: auto;
  font-size: 16px;
}
</style>
