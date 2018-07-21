<template>
  <div id="app">
    <pop v-show="popobj.popif" :words="popobj.words" :type="popobj.type"></pop>
    <router-view></router-view>
  </div>
</template>

<script>
import pop from './components/pop.vue'
window.onload = function (){
  var scale = 1 / devicePixelRatio;
  document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 22 + 'px';
}

Date.prototype.Format = function(fmt){  
    var o = {  
         "M+": this.getMonth()+1,  
         "d+": this.getDate(),  
         "H+": this.getHours(),  
         "m+": this.getMinutes(),  
         "s+": this.getSeconds(),  
         "S+": this.getMilliseconds()  
    };  
    if(/(y+)/.test(fmt)){  
        fmt=fmt.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));  
    }  
    for(var k in o){  
        if (new RegExp("(" + k +")").test(fmt)){  
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));  
        }  
    }     
    return fmt;  
}

export default {
  name: 'App',
  components : {
    pop
  },
  computed : {
    popobj() {
      return this.$store.state.pop;
    }
  },
  mounted() {
    if(this.$store.dispatch({
      type : 'checklog'
    })) {
      this.$store.dispatch({
        type : 'getprompts'
      });
    }
  },
  destoryed() {
    this.$store.commit('clear');
  }
}
</script>

<style>
*{
      margin: 0;
      padding: 0;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
html {
  min-height: 100%;
  _height:100%;
  height:100%;
}
body {
  min-height: 100%;
  _height:100%;
  height:100%;
  /*background: #ff0000;*/
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
  height: 100%;
}
</style>
