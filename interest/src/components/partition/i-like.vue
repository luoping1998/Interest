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
					backgroundImage: `url(${this.asrc})`
				}	
			}else {
				this.note = {
					backgroundImage: `url(${this.nsrc})`
				}	
			}
		}
	}
}	
</script>

<style scoped>
.icon {
	color: gray;
	float: right;
	font-size: 0.8rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 10px;
}

.icon .i-icon {
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 5px;
	background-size: 100% auto;
	cursor: pointer;
}
</style>