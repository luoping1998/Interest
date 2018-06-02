<template>
	<div id="world">
		<loading></loading>
		<div class="hot"><p>hot</p></div>
		<div class="new">
			<card v-for = "item in newDatas" :info="item" :show="false"></card>
		</div>
	</div>
</template>

<script>
import card from '../../components/card.vue'
import loading from '../../components/loading.vue'
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

			}else {
				this.newDatas = this.newDatas.concat(res.body.result);
				// console.log(this.newDatas);
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

