<template>
	<div>
		<u-head></u-head>
		<u-card v-for = "item in infors" :key="item.id" :info = "item" :show="false" :imgsrc="pic"></u-card>
	</div>
</template>

<script>
import uHead from '../../components/l-head.vue'
import uCard from '../../components/card.vue'
export default{
	name : 'Userpub',
	data() {
		return {
			info : {}
		}
	},
	computed : {
		infors () {
			return this.info.result;
		},
		pic () {
			return this.info.pic;
		}
	},
	methods : {
		getpub() {
			this.$http.get('http://localhost:8000/msgs/u_msg', { params : this.$route.params,
				credentials : true}).then(function(res) {
					if(res.body.error) {
						this.$store.commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.info = res.body;
					}
				})
		}
	},
	created() {
		this.getpub();
	},
	components : {
		uHead,
		uCard
	}
}
</script>

<style scoped>
	
</style>