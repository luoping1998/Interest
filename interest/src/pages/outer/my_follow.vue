<template>
	<div class="men-list">
		<l-head words="我关注的"></l-head>
		<busy v-if="!ok"></busy>
		<div class="f-list" v-show="ok">
			<f-li v-for = "(item,index) in infos" :info="item" :key="item.id" :pic="pics[index]"></f-li>
		</div>
	</div>
</template>

<script>
import fLi from '../../components/f-li.vue'
import lHead from '../../components/l-head.vue'
import busy from '../../components/busy.vue'
export default{
	name : 'menList',
	created() {
		this.ok = false;
		this.$http.get('http://139.199.205.91:8000/users/stars',{
			params : {id : this.$route.params.u_id
			}, credentials : true
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

.men-list .f-head {
	position: relative;
	width: 100%;
	height: 3.5rem;
	font-size: 1rem;
	line-height: 3.5rem;
	letter-spacing: 0.2rem;
	border-bottom: 1px solid lightgray;
	color: white;
	font-weight: bold;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
}
.f-head .f-back {
	width: 3.5rem;
	height: 3.5rem;
	background:url('../../../static/icons/return.png') no-repeat;
	background-size: 60% auto;
	background-position: center;
	position: absolute;
	top: 0;
	left: 0;
}
.men-list .f-list {
	width: 100%;
	height: auto;
}
</style>