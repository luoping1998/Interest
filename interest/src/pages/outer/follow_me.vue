<template>
	<div class="men-list">
		<l-head words="关注我的"></l-head>
		<busy v-if="!ok"></busy>
		<div class="f-list" v-show="ok">
			<f-li v-for = "(item,index) in infos" :key="item.id" :info="item" :pic="pics[index]"></f-li>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import fLi from '../../components/f-li.vue'
import lHead from '../../components/l-head.vue'
import busy from '../../components/busy.vue'
export default{
	name : 'menList',
	created() {
		this.ok = false;
		this.$http.get('http://139.199.205.91:8000/users/fans',{
			params: {
				id : this.$route.params.u_id
			},
			credentials : true
		}).then(function (res) {
			this.ok = true;
			if(res.body.error){
				bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
			}else {
				this.infos = res.body.result;
				this.pics = res.body.pics;
			}
		})
	},
	components : {
		fLi,
		lHead,
		busy
	},
	data() {
		return {
			infos : [],
			pics : [],
			ok : false
		}
	}
}
</script>

<style scoped>
.men-list {
	width: 100%;
	height: auto;
}

.men-list .f-list {
	width: 100%;
	height: auto;
}
</style>