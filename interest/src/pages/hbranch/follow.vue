<template>
	<div id="follow">
		<loading></loading>
		<busy v-if="!infors.length"></busy>
		<card v-for = "(item,index) in infors" :key="item.id" :info = "item" :show="false" :imgsrc="pics[index]" :imgs="imgs[index]"></card>
		<loading text="加载更多"></loading>
	</div>
</template>
<script>
import {update} from '../../../static/js/up_scroll.js'
import {Loading} from '../../../static/js/load.js'
import busy from '../../components/busy.vue'
import loading from '../../components/loading.vue'
import card from '../../components/card.vue'
export default {
	name : 'Follow',
	components: {
		card,
		loading,
		busy
	},
	computed : {
		infors() {
			return this.$store.state.message.follow;
		},
		pics() {
			return this.$store.state.message.fpics;
		},
		imgs() {
			return this.$store.state.message.fimgs;
		}
	},
	created() {
		this.$store.dispatch({
	      type : 'checklog'
	    });
	},
	mounted() {
		this.getFollow(0);
		var oIndex = document.getElementById('index');
		var oF = document.getElementById('follow');
		var oL = document.getElementsByClassName('loading')[0];
		var _this = this;
		var oJ = document.getElementsByClassName('loading')[1];
		update(oIndex,oF,oL,function() {
			_this.getFollow(0);
		})
		Loading(oIndex,oF,oJ,function() {
			_this.getFollow(1);
		})
	},
	methods : {
		getFollow (count) {
			var oL = document.getElementsByClassName('loading')[0];
			var oJ = document.getElementsByClassName('loading')[1];
			var start;
			if(count == 0) start = 0;
			else start = this.$store.state.message.follow.length;
			// console.log(start);
			this.$http.get('http://139.199.205.91:8000/msgs/getfmsg',{
				credentials : true , params : {start : start}}).then(function(res) {
				if(res.body.error){
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					if(start == 0) {
						this.$store.commit('savefollow', res.body.result);
						this.$store.commit('savefpics', res.body.pics);
						this.$store.commit('savefimgs', res.body.imgs);
					}else {
						this.$store.commit('concatfpics', res.body.pics);
						this.$store.commit('concatfollow',res.body.result);
						this.$store.commit('concatfimgs',res.body.imgs);
					}
				}
			})
			var timer = setTimeout(function(){
				oL.style.height = 0;
				oJ.style.height = 0;
				clearTimeout(timer);
			},1500);
			
		}
	}
}
</script>

<style scoped>
#follow {
	width: 100%;
	height: auto;
	padding-bottom: 20%;
	overflow: scroll;
}
</style>
