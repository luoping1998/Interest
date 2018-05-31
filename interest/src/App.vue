<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
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
