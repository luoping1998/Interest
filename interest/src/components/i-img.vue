<template>
	<div class="i-img" :style="note" />
</template>

<script type="text/javascript">
export default {
	name : 'iImg',
	props : ['url'],
	data() {
		return {
			note :{
				background: "url(" + this.url + ") no-repeat",
      	backgroundSize: "100% auto",
       	backgroundPosition: "center"
			}
		}
	}
}
</script>

<style type="text/css" scoped>
.i-img {
	width: 30%;
	height: 0;
	padding-bottom: 30%;
	margin-right: 3%;
	margin-top: 0.5rem;
	display: inline-block;
	overflow: hidden;
}
</style>