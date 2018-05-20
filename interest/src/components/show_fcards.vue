<template>
	<div id="showfcards">
		<f-card v-for="item in lists">{{item}}</f-card>
	</div>
</template>

<script>
import fCard from '../components/partition/fcard.vue'
export default {
	name : 'showFcards',
	props : ['lists'],
	components : {
		fCard
	}
}
</script>

<style scoped>
#showfcards {
	width: 100%;
	height: 100vh;
}
</style>