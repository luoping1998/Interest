<template>
  <div id="app">
      <div id="f-screen">
        <div id="loading-center">
          <div id="loading-center-absolute">
          <div class="object" id="object_four"></div>
          <div class="object" id="object_three"></div>
          <div class="object" id="object_two"></div>
          <div class="object" id="object_one"></div>
        </div>
      </div>
      </div>
      <pop v-show="popobj.popif" :words="popobj.words" :type="popobj.type"></pop>
      <router-view></router-view>
  </div>
</template>

<script>
import './styles/index.css';
import '../static/animate.min.css'
import pop from './components/pop.vue'
  window.onload = function (){
    // 
    document.getElementById('f-screen').style.display = 'none';
    var _body = document.getElementsByTagName('body')[0];
    var scale = 1 / devicePixelRatio;
    document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.style.fontSize = (document.documentElement.clientHeight * 0.6) / 22 + 'px'

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
    for(let k in o){  
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
  },
  created() {
    this.$store.dispatch({
      type : 'getpubKey'
    });
  }
}
</script>

<style>
html,body{ 
  margin: 0 auto;
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
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

#f-screen{
  background-color: #2575fc;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  margin-top: 0px;
  top: 0px;
}

#loading-center{
  width: 100%;
  height: 100%;
  position: relative;
}

#loading-center-absolute {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 200px;
  width: 200px;
  margin-top: -100px;
  margin-left: -100px;
  -ms-transform: rotate(-135deg); 
  -webkit-transform: rotate(-135deg); 
  transform: rotate(-135deg);
}

.object{
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
  position: absolute;
  border-top: 5px solid #FFF;
  border-bottom: 5px solid transparent;
  border-left:  5px solid #FFF;
  border-right: 5px solid transparent;
  -webkit-animation: animate 2s infinite;
  animation: animate 2s infinite; 
}

#object_one{
  left: 75px;
  top: 75px;
  width: 50px;
  height: 50px;
}
      
#object_two{
  left: 65px;
  top: 65px;
  width: 70px;
  height: 70px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

#object_three{
  left: 55px;
  top: 55px;
  width: 90px;
  height: 90px;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

#object_four{
  left: 45px;
  top: 45px;
  width: 110px;
  height: 110px;
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

@-webkit-keyframes animate {
50% {
  -ms-transform: rotate(360deg) scale(0.8); 
    -webkit-transform: rotate(360deg) scale(0.8); 
    transform: rotate(360deg) scale(0.8); 
  }
}

@keyframes animate {
50% {
  -ms-transform: rotate(360deg) scale(0.8); 
    -webkit-transform: rotate(360deg) scale(0.8); 
    transform: rotate(360deg) scale(0.8); 
  }   
}
</style>
