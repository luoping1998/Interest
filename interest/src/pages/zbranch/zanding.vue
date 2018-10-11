<template>
	<div id="mess" :style="note">
    <div class="m-head">
      <div class="m-back" @click="$router.go(-1)"></div>
      <router-link class="m-icon" to="topub"></router-link>  
    </div>
    <router-view class="show"  ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Zanding',
  created() {
    this.$store.dispatch({
      type : 'checklog'
    });
    this.$emit('try',1);
  },
  methods : {
    topub() {
      this.$router.push('./topub');
    }
  }
}
</script>

<style>
#mess {
  width: 100%;
  height: 100%;
}

#mess .m-head {
  width: 100%;
  height: 3rem;
  position: fixed;
  top: 0;
  right: 0;
  background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
}

.m-head .m-icon{
  width: 3rem;
  height: 3rem;
  float: right;
  background:url('../../../static/icons/add.png') no-repeat;
  background-size: 60% auto;
  background-position: center;
}

.m-head .m-back {
  width: 3rem;
  height: 3rem;
  float: left;
    background:url('../../../static/icons/return.png') no-repeat;
  background-size: 60% auto;
  background-position: center;
}

#mess .show {
  width:100%;
  height:80%;
}
</style>
