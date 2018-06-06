<template>
	<div id="world">
		<loading text="刷新中..."></loading>
		<div class="new">
			<card v-for = "(item,index) in newDatas" :info="item" :show="false" :imgsrc="pics[index]"></card>
		</div>
		<!-- <div class="hhh"></div> -->
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
	data() {
		return {
			newDatas : [],
			hotData : [],
			pics : [],
			count : 0
		}
	},
	mounted() {
		this.getNewDatas(1);
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
		getNewDatas(type) {
			var start;
			if(type == 0) start = 0;
			else start = this.count; 
			console.log(start);
			var oL = document.getElementsByClassName('loading')[0];
			var oH = document.getElementsByClassName('loading')[1];
			this.$http.get('http://localhost:8000/msgs/wnew',{
				params : {
					start : start
				},
				credentials : true
			}).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					if(type == 0) {
						this.pics = res.body.pics;
						this.newDatas = res.body.result;
					}else {
						if(res.body.result.length){
							this.count += 10;
						}
						this.pics = this.pics.concat(res.body.pics);
						this.newDatas = this.newDatas.concat(res.body.result);
						
					}
					
				}
				// var timer = setTimeout(function(){
					oL.style.height = 0;
					oH.style.height = 0;
				// 	clearTimeout(timer);
				// },1000);
				
			})
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

