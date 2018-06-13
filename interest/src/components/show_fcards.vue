<template>
	<div id="showfcards">
		<f-card v-for="(item,index) in alists" :key="item.id" :item="item" :src="apics[index]" v-if="apics"></f-card>
	</div>
</template>

<script>
import fCard from './partition/fcard.vue'
export default {
	name : 'showFcards',
	props :['lists','pics'],
	components : {
		fCard
	},
	computed : {
		alists : function () {
			return this.lists;
		},
		apics : function () {
			return this.pics;
		}
	}
}
</script>

<style scoped>
#showfcards {
	width: 100%;
	height: auto;
}
</style>