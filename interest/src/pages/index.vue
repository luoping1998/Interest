<template>
	<div id="index">
		<router-view></router-view>
		<i-footer></i-footer>
	</div>
</template>

<script>
import iFooter from '../components/footer.vue';

export default {
	name :'index',
	components : {
		iFooter
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