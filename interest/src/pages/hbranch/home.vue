<template>
	<div id="home">
		<home-header />
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import homeHeader from '../../components/h-header.vue'
export default {
  name: 'Home',
  components : {
  	homeHeader
  },
  mounted() {
  	this.$emit('try', 0);
  }
}
</script>

<style scoped>
#home {
	margin: 0;
	padding:0;
	width: 100%;
	position: relative;
	padding-top:3rem;
}
</style>
