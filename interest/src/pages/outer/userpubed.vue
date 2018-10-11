<template>
	<div id="userpub">
		<u-head></u-head>
		<busy v-if="!ok"></busy>
		<u-card v-show="ok" v-for = "(item,index) in infors" :key="item.id" :info = "item" :show="false" :imgsrc="pic" :imgs="imgs[index]"></u-card>
	</div>
</template>

<script>
import uHead from '../../components/l-head.vue'
import uCard from '../../components/card.vue'
import busy from '../../components/busy.vue'
export default{
	name : 'Userpub',
	data() {
		return {
			info : {},
			ok : false
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
			this.ok = false;
			this.$http.get('http://localhost:8000/msgs/u_msg', { params : this.$route.params,
			credentials : true}).then(function(res) {
				this.ok = true;
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
		uCard,
		busy
	}
}
</script>

<style scoped>
#userpub {
	margin-top: 4rem;
}
</style>