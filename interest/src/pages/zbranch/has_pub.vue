<template>
	<div id="pubed">
		<card v-for="item in pubed" :info.sync="item" :key="item.id" :imgsrc="pic" :show="true"></card>
	</div>
</template>

<script>
import card from '../../components/card.vue'
// let formName = false;
export default{
	name : 'pub',
	components : {
		card
	},
	computed : {
		pubed() {
			return this.$store.state.selfinfo.megs;
		},
		pic() {
			return this.$store.state.selfinfo.pic;
		}
	}
}
</script>

<style scoped>
#pubed {
	width: 100%;
	margin-bottom: 20%;
	height: auto;
	overflow: scroll;
}
</style>