<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$http.post('http://localhost:8000/users/',{}, { emulateJSON : true,withCredentials: true }).then(function(res) {
        if(!res.body.error) {
          sessionStorage.setItem('user',JSON.stringify(res.body.infor));
          this.$router.push('/index/home');
        }else{
          this.$router.push('/login');
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
  min-height: 100vh;
  font-size: 16px;
}
</style>
