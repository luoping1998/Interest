<template>
	<div class="i-img" :style="note">
	</div>
</template>

<script type="text/javascript">
export default {
	name : 'iImg',
	pops : ['url'],
	data: function() {
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
	width: 5rem;
	height: 5rem;
	margin-top: 0.5rem;
	overflow: hidden;
}
</style>