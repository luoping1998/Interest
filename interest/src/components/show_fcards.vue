<template>
	<div id="showfcards">
		<f-card v-for="item in lists" :item="item"></f-card>
	</div>
</template>

<script>
import fCard from './partition/fcard.vue'
export default {
	name : 'showFcards',
	props : {
		lists : Array
	},
	components : {
		fCard
	}
}
</script>

<style scoped>
#showfcards {
	width: 100%;
	height: auto;
}
</style>