<template>
<div class="s-leader">
	<input type="text" :placeholder="words" v-model="val" @keyup="getinfo">
	<div class="s-but" @click="$router.go(-1)">取消</div>
</div>
</template>

<script>
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
			if(this.val) {
				this.$http.get('http://139.199.205.91:8000/users/search',{
					params : {'val' : this.val
				}, credentials: true}).then(function(res) {
					if(res.body.error){
						this.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
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
	width: 90%;
	height: 3rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	font-size: 0.8rem;
}

.s-leader input {
	width: 100%;
	height: 2rem;
	outline: none;
	display: block;
	border: none;
	border-radius: 20px;
	line-height:2rem;
	text-anchor: 1rem;
	padding: 0 1rem;
	background-color: rgba(200,200,200,0.2);
} 
.s-but {
	width:20%;
	height: 100%;
	line-height: 3.3rem;
	text-align: center;
	cursor: pointer;
}

.s-leader input::-webkit-input-placeholder{
  font-size: 0.8rem;
}
.s-leader input::-moz-placeholder{
  font-size: 0.8rem;
}
.s-leader input:-moz-placeholder{
  font-size: 0.8rem;
}
.s-leader input:-ms-input-placeholder{
  font-size: 0.8rem;
}
</style>