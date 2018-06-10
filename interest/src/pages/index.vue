<template>
	<div id="index">
	<!-- <keep-alive> -->
		<router-view @try="change"></router-view>
	<!-- </keep-alive> -->
		<i-footer :index="index"></i-footer>
	</div>
</template>

<script>
import iFooter from '../components/footer.vue';
export default {
	name :'index',
	components : {
		iFooter
	},
	data(){
		return {
			index : 0
		}
	},
	methods : {
		change(i) {
			this.index = i;
		}
	}
}
</script>

<style scoped>
#index {
	width: 100%;
	height: 100vh;
	overflow: scroll;
}
</style>