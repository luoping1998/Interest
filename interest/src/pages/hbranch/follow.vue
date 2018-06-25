<template>
	<div id="follow">
		<loading></loading>
		<card v-for = "(item,index) in infors" :key="item.id" :info = "item" :show="false" :imgsrc="pics[index]" :imgs="imgs[index]"></card>
	</div>
</template>
<script>
import {update} from '../../../static/js/up_scroll.js'
import loading from '../../components/loading.vue'
import card from '../../components/card.vue'
export default {
	name : 'Follow',
	components: {
		card,
		loading
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
		this.$store.dispatch('getfollow');
		var oIndex = document.getElementById('index');
		var oF = document.getElementById('follow');
		var oL = document.getElementsByClassName('loading')[0];
		var _this = this;
		update(oIndex,oF,oL,function() {
			_this.getFollow();
		})
	},
	methods : {
		getFollow () {
			this.$store.dispatch('getfollow');
			var oL = document.getElementsByClassName('loading')[0];
			var timer = setTimeout(function(){
				oL.style.height = 0;
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
