<template>
	<div id="pubed">
		<card v-for="(item,index) in pubed" :info.sync="item" :key="item.id" :imgsrc="pic" :imgs="imgs[index]" :show="true"> </card>
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
		imgs() {
			return this.$store.state.selfinfo.imgs;
		},
		pic() {
			return this.$store.state.selfinfo.pic;
		}
	},
	created() {
		console.log(this.$store.state.selfinfo.megs);
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