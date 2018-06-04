<template>
	<div id="world">
		<div class="new">
			<card v-for = "item in newDatas" :info="item" :show="false"></card>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import card from '../../components/card.vue'
import loading from '../../components/loading.vue'
import pop from '../../components/pop.vue'
export default {
	name : 'World',
	components : {
		card,
		loading
		// pop
	},
	data() {
		return {
			newDatas : [],
			hotData : [],
			count : 0
		}
	},
	mounted() {
		var params = {
			start : 0
		};
		this.$http.get('http://localhost:8000/msgs/wnew',{
			params : params,
			credentials : true
		}).then(function(res) {
			if(res.body.error) {
				bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
			}else {
				this.newDatas = this.newDatas.concat(res.body.result);
				this.count += 10;
			}
		})
	},
	methods : {
		getNewDatas() {
			this.$http.get('http://localhost:8000/msgs/wnew',{
				params : {
					start : this.start
				},
				credentials : true
			}).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					this.newDatas.concat(res.body.result);
					this.count += 10;
				}
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
}
</style>

