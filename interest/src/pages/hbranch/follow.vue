<template>
	<div id="follow">
		<card :imgsrc="imgsrc"></card>
		<card :imgsrc="imgsrc"></card>
		<card :imgsrc="imgsrc"></card>
	</div>
</template>


<script>
import card from '../../components/card.vue'
export default {
	name : 'Follow',
	//props:['info','imgsrc'],
	components: {
		card
	},
	data: function() {
		return {
			imgsrc : '../../../static/info.png'
		}
	}
}
</script>

<style scoped>
#follow {
	width: 100%;
	height: 115vh;
	overflow: scroll;
}
</style>
