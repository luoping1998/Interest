<template>
	<div id="userpub">
		<u-head></u-head>
		<u-card v-for = "(item,index) in infors" :key="item.id" :info = "item" :show="false" :imgsrc="pic" :imgs="imgs[index]"></u-card>
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
		},
		imgs() {
			return this.info.imgs;
		}
	},
	methods : {
		getpub() {
			this.$http.get('http://139.199.205.91:8000/msgs/u_msg', { params : this.$route.params,
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
#userpub {
	margin-top: 4rem;
}
</style>