<template>
	<div id="index" >
		<router-view @try="change"></router-view>
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