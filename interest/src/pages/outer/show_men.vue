<template>
	<div class="men-list">
		<div class="f-head" v-if = "flag == 1">关注我的
			<div class="f-back" @click="back"></div>
		</div>
		<div class="f-head" v-else>我关注的<div class="f-back" @click="back"></div></div>
		<div class="f-list">
			<f-li v-for = "(item,index) in infos" :info="item" :pic="pics[index]"></f-li>
		</div>
	</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import fLi from '../../components/f-li.vue'
export default{
	name : 'menList',
	created() {
		var str = ''; 
		this.flag = this.$route.params.id;
		if(this.flag == 1) {
			str = 'fans';
		}else {
			str = 'stars';
		}
		this.$http.get('http://localhost:8000/users/'+str,{
			params : {id : this.$route.params.u_id
			}, credentials : true
		}).then(function (res) {
			if(res.body.error){
				bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
			}else {
				this.infos = res.body.result;
				this.pics = res.body.pics;
			}
		})
	},
	components : {
		fLi
	},
	data() {
		return {
			flag : 2,
			infos : [],
			pics : []
		}
	},
	methods: {
		back() {
			this.$router.go(-1);
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