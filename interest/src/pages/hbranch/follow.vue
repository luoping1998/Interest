<template>
	<div id="follow">
		<loading></loading>
		<card v-for = "(item,index) in infors" :info = "item" :show="false" :imgsrc="pics[index]"></card>
	</div>
</template>
<script>
import {bus} from '../../../static/js/bus.js'
import {update} from '../../../static/js/up_scroll.js'
import loading from '../../components/loading.vue'
import card from '../../components/card.vue'
export default {
	name : 'Follow',
	components: {
		card,
		loading
	},
	data: function() {
		return {
			infors : [],
			pics : []
		}
	},
	mounted() {
		this.getFollow();
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
			var oL = document.getElementsByClassName('loading')[0];
			this.$http.get('http://localhost:8000/msgs/getfmsg',{credentials : true }).then(function(res) {
				if(res.body.error){
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					this.infors = res.body.result;
					this.pics = res.body.pics;
				}
				// var timer = setTimeout(function(){
					oL.style.height = 0;
					// clearTimeout(timer);
				// },2000);
			})
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
