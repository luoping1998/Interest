<template>
	<div id="mess">
    <div class="m-head">
      <router-link class="m-icon" to="topub"></router-link>  
    </div>
    <router-view class="show" ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Zanding',
  created() {
  	this.$emit('try',1);
  },
  methods : {
    topub() {
      this.$router.push('./topub');
    }
  }
}
</script>

<style scoped>
#mess {
  /*overflow: hidden;*/
  width: 100%;
  height: 100%;
}

#mess .m-head {
  width: 100%;
  height: 8%;
  background-color: rgb(126,177,245);
}

.m-head .m-icon{
  width: 3rem;
  height: 3rem;
  float: right;
  background:url('../../../static/icons/add.png') no-repeat;
  background-size: 60% auto;
  background-position: center;
}

#mess .show {
  width:100%;
  height:80%;
  float: left;
}
</style>
