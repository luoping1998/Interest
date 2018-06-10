<template>
	<div class="f-head">{{words}}
		<div class="f-back" @click="back"></div>
	</div>
</template>		

<script>
export default {
	name : 'Fhead',
	props : ['words'],
	methods : {
		back() {
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
.f-head {
	position: relative;
	width: 100%;
	height: 3.5rem;
	font-size: 1rem;
	line-height: 3.5rem;
	letter-spacing: 0.2rem;
	border-bottom: 1px solid lightgray;
	color: white;
	font-weight: bold;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
}
.f-head .f-back {
	width: 3.5rem;
	height: 3.5rem;
	background:url('../../static/icons/return.png') no-repeat;
	background-size: 60% auto;
	background-position: center;
	position: absolute;
	top: 0;
	left: 0;
}
</style>
