<template>
  <div id="app">
      <pop v-show="popobj.popif" :words="popobj.words" :type="popobj.type"></pop>
    <router-view></router-view>
  </div>
</template>

<script>
import '../static/animate.min.css'
import pop from './components/pop.vue'
window.onload = function (){
  var scale = 1 / devicePixelRatio;
  document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 22 + 'px';
  var _body = document.getElementsByTagName('body')[0];
  _body.style.height = _body.clientHeight + 'px';
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
  destoryed() {
    this.$store.commit('clear');
  }
}
</script>

<style>
html,body{ 
  margin: 0;
  padding: 0;
  height:100%; 
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
