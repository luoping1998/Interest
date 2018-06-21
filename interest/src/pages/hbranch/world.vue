<template>
	<div id="world">
		<loading text="刷新中..."></loading>
		<div class="new">
			<card v-for = "(item,index) in newDatas" :key="item.id" :info="item" :show="false" :imgsrc="pics[index]" :imgs="imgs[index]"></card>
		</div>
		<loading text="加载中..."></loading>
	</div>
</template>

<script>
import {update} from '../../../static/js/up_scroll.js'
import {Loading} from '../../../static/js/load.js'
import {bus} from '../../../static/js/bus.js'
import card from '../../components/card.vue'
import loading from '../../components/loading.vue'
import pop from '../../components/pop.vue'
export default {
	name : 'World',
	components : {
		card,
		loading
	},
	computed : {
		newDatas() {
			return this.$store.state.message.world;
		},
		pics() {
			return this.$store.state.message.wpics;
		},
		imgs() {
			return this.$store.state.message.wimgs;
		}
	},
	mounted() {
		this.getNewDatas();
		// console.log(this.$store);
		var oIndex = document.getElementById('index');
		var oW = document.getElementById('world');
		var oL = document.getElementsByClassName('loading')[0];
		var oH = document.getElementsByClassName('loading')[1];
		var _this = this;
		update(oIndex,oW,oL,function() {
			_this.getNewDatas(0);
		})
		Loading(oIndex,oW,oH,function() {
			_this.getNewDatas(1);
		})
	},
	methods : {
		getNewDatas(count) {
			var oL = document.getElementsByClassName('loading')[0];
			var oH = document.getElementsByClassName('loading')[1];
			this.$store.dispatch("getworld",count);
			// console.log(this.$store.state.message.world);
			var timer = setTimeout(function(){
				oL.style.height = 0;
				oH.style.height = 0;
			},1000);
		}

	}
}
</script>

<style scoped>
#world {
	width: 100%;
	margin-bottom: 20%;
	height: auto;
	overflow: scroll;
}

/*#world .hhh {
	width: 100%;
	height: 0;
	transition: height 1s;
    -webkit-transition:height 1s;
    overflow: hidden;
}*/
</style>

