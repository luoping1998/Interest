<template>
	<div class="i-icon" :style="note" @click="like"></div>
</template>

<script>
export default {
	name: 'icon',
	props : ['nsrc','asrc'],
	data : function() {
		return {
			note :{
				backgroundImage: "url(" + this.nsrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto",
            	backgroundPosition: "center"
			}
		}
	},
	methods : {
		like : function() {
			this.note = {
				backgroundImage: "url(" + this.asrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto",
            	backgroundPosition: "center"
			}		
		}
	}
}	
</script>

<style scoped>
.i-icon {
	width: 2rem;
	height: 2rem;
	margin-right: 0.5rem;
	float: right;
}
</style>