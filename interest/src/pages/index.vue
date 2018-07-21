<template>
	<div id="index">
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
	},
	mounted() {
		var oel = document.getElementById("index");
		oel.style.height = oel.clientHeight + 'px'; 
	}
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

html {
	min-height: 100%;
	_height:100%;
	height:100%;
}

body {
	min-height: 100%;
	_height:100%;
	height:100%;
}

#index {
	width: 100%;
	overflow: scroll;
	height: 100%;
}
</style>