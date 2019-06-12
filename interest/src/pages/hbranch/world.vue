<template>
	<div id="world">
		<loading text="刷新中..." />
		<busy v-show="!ok"></busy>
		<div v-show="ok" class="show-world">
			<card v-for = "(item,index) in newDatas" :key="item.id" :info="item" :show="false" :imgsrc="pics[index]" :imgs="imgs[index]"></card>
		</div>
		<loading text="加载中..."></loading>
	</div>
</template>

<script>
import '../../../static/animate.min.css'
import {update} from '../../../static/js/up_scroll.js'
import {Loading} from '../../../static/js/load.js'
import card from '../../components/card.vue'
import loading from '../../components/loading.vue'
import pop from '../../components/pop.vue'
import busy from '../../components/busy.vue'
export default {
	name : 'World',
	components : {
		card,
		loading,
		busy,
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
		this.getNewDatas(0);
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
	data() {
		return {
			ok: false
		}
	},
	methods : {
		getNewDatas(count) {
			this.ok = false;
			var oL = document.getElementsByClassName('loading')[0];
			var oH = document.getElementsByClassName('loading')[1];
			var start;
			if(count == 0) start = 0;
			else start = this.$store.state.message.world.length;
			
			this.$http.get('http://139.199.205.91:8000/msgs/wnew',{
				params : {
					start : start
				},
				_timeout : 5000,
				credentials : true
			}).then(function(res) {
				this.ok = true;
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					if(start == 0) {
						this.$store.commit('savewpics', res.body.pics);
						this.$store.commit('saveworld',res.body.result);
						this.$store.commit('savewimgs',res.body.imgs);
					}else {
						this.$store.commit('concatwpics', res.body.pics);
						this.$store.commit('concatworld',res.body.result);
						this.$store.commit('concatwimgs',res.body.imgs);
					}
				}
			},function(err) {
				this.$store.commit('showpop',{'popif' : true,'words' : '请求超时，请重试','type' : 0});
			})
			var timer = setTimeout(function(){
				oL.style.height = 0;
				oH.style.height = 0;
			},1000);
		}

	}
}
</script>

<style>
#world {
	width: 100%;
	height: 100%;
	padding-bottom: 10vh;
}

.show-world {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
}
</style>

