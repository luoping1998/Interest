<template>
	<div class="m-header">
		<img class="icon" :src="src"/>
	</div>
</template>

<script>
export default {
	name : 'mHeader',
	data : function (){
		return {
			src:'../../../static/n-chan.png'
		}
	},
	methods : {

	}
}
</script>

<style scoped>
.m-header {
	width: 100%;
	min-height: 7.5vh;
}

.m-header .icon {
	width: 1.8rem;
	height: 1.5rem;
	margin: 0.7rem;
	float: right;
	border:none;
}
</style>