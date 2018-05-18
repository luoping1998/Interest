<template>
	<div id="home">
		<home-header></home-header>
		<router-view></router-view>
	</div>
</template>

<script>
import homeHeader from '../components/h-header.vue'
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components : {
  	homeHeader
  }
}
</script>

<style scoped>
#home {
	margin: 0;
	padding:0;
	width: 100%;
	min-height:100vh;
	position: relative;
	padding-top:9.5vh;
}
</style>
