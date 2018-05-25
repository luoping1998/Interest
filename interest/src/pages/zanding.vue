<template>
	<div id="mess">
    <div class="m-head">
      <router-link class="m-icon" to="topub"></router-link>
      <router-view ></router-view>
    </div>
	</div>
</template>

<script>
export default {
  name: 'Zanding',
  mounted() {
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
  height: 100vh;
}

#mess .m-head {
  width: 100%;
  height: 8vh;
  background-color: rgb(126,177,245);
}

.m-head .m-icon{
  width: 8vh;
  height: 8vh;
  float: right;
  background:url('../../static/icons/add.png') no-repeat;
  background-size: 60% auto;
  background-position: center;
}
</style>
