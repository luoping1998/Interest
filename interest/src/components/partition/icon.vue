<template>
	<div class="icon">
		<img v-bind:src="now">
		<p>{{words}}</p>
	</div>
</template>

<script>
/*
	now : 当前选中link img的src
	words : 该icon的名称
	index : 该icon的下标 用于footer中点击改变其他icon时作用
 */
	export default {
		name : 'icon',
		props :	['now','words','index']
	}
</script>

<style scoped>
	.icon {
		width: 100%;
		height: 100%;
	}
	img {
		width: 4vh;
		height: auto;
		display: block;
		margin: 0 auto;
		margin-top: 1.5vh;
	}
	p {
		font-size: 0.7rem;
		padding: 0;
		margin: 0;
		margin-top:0.5vh;
		color: black;
	}
</style>