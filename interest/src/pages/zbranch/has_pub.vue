<template>
	<div id="pubed">
		<busy v-show="!ok"></busy>
		<div v-show="ok">
			<card v-for="(item,index) in pubed" :info.sync="item" :key="item.id" :imgsrc="pic" :imgs="imgs[index]" :show="true"> </card>
		</div>
		<div v-if="!pubed.length && ok">
			<p>还没有发过帖子哦</p>
		</div>
		<loading text="加载中"></loading>
	</div>
</template>

<script>
import busy from '../../components/busy.vue'
import {Loading} from '../../../static/js/load.js'
import loading from '../../components/loading.vue'
import card from '../../components/card.vue'
export default{
	name : 'pub',
	components : {
		card,
		loading,
		busy
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
		},
		ok() {
			return this.$store.state.selfinfo.pubok;
		}
	},
	created() {
		if(this.$store.state.selfinfo.logif) {
			this.$store.commit('isok');
		}
	}
}
</script>

<style scoped>
#pubed {
	width: 100%;
	padding-bottom: 20%;
	margin-top: 3rem;
	overflow-y: scroll;
}
</style>