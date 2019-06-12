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

<style>
.f-head {
	width: 100%;
	height: 2.5rem;
	font-size: 0.9rem;
	line-height: 2.5rem;
	letter-spacing: 0.2rem;
	color: white;
	font-weight: bold;
	position: relative;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
}

.f-head .f-back {
	width: 2.5rem;
	height: 2.5rem;
	background:url('../../static/icons/return.png') no-repeat;
	background-size: 50% auto;
	background-position: center;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
}
</style>
