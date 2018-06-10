<template>
<div class="s-leader">
	<div class="s-body">
		<input type="text" :placeholder="words" v-model="val" @keyup="getinfo">
	</div>
	<div class="s-but" @click="$router.go(-1)">取消</div>
</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
export default {
	name : 's-leader',
	props : ['words'],
	data () {
		return {
			val : ''
		}
	},
	methods : {
		//get跨域 添加credentials :true 参数允许携带cookie
		getinfo () {
			console.log(this.val);
			if(this.val) {
				this.$http.get('http://localhost:8000/users/search',{
					params : {'val' : this.val
				}, credentials: true}).then(function(res) {
					if(res.body.error){
						bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
					}else {
						if(res.body.result) {
							this.$emit('trans',{
								'lists' : res.body.result,
								'pics' : res.body.pics
							});
						}else {
							this.$emit('trans');
						}
					}
				})
			}
		}
	}
}
</script>

<style scoped>
.s-leader {
	width: 100%;
	height: 10vh;
	/*background-color: pink;*/
}

.s-body {
	padding-left: 5vw;
	width: 67%;
	height: 100%;
	float: left;
}

.s-body input {
	width: 100%;
	height: 55%;
	margin:0 auto;
	margin-top: 2vh;
	outline: none;
	display: block;
	border: none;
	border-radius: 20px;
	font-size: 0.9rem;
	line-height: 5.5vh;
	text-anchor: 1rem;
	padding-left: 1rem;
	padding-right: 1rem;
	background-color: rgba(200,200,200,0.2);
}

.s-but {
	width:20%;
	height: 100%;
	float: right; 
	line-height: 10vh;
	text-align: center;
	font-size: 0.9rem;
}
input::-webkit-input-placeholder{
    font-size: 0.8rem;
}
input::-moz-placeholder{
    font-size: 0.8rem;
}
input:-moz-placeholder{
    font-size: 0.8rem;
}
input:-ms-input-placeholder{
    font-size: 0.8rem;
}
</style>