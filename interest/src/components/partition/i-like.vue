<template>
	<div class="icon">
		<div  class="i-icon" :style="note" @click="like"></div>
		<div class="i-words" v-if="count">{{count}}</div>
	</div>
</template>

<script>
export default {
	name: 'icon',
	props : ['nsrc', 'asrc', 'count', 'show'],
	data : function() {
		return {
			note :{
				backgroundImage: `url(${this.nsrc})`
			}
		}
	},
	methods : {
		like : function() {
			if(this.show === true) {
				this.note = {
					backgroundImage: "url(" + this.asrc + ")"
				}	
			}else {
				this.note = {
					backgroundImage: "url(" + this.nsrc + ")"
				}	
			}
		}
	}
}	
</script>

<style scoped>
.icon {
	width: 3rem;
	height: auto;
	text-align: 1.5rem;
	line-height: 2.5rem;
	color: gray;
	float: right;
	font-size: 0.8rem;
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
}

.icon .i-icon {
	width: 1.5rem;
	height: 2.5rem;
	float: left;
}

.icon .i-words {
	width: 1.5rem;
	height: auto;
	float: left;
}
</style>