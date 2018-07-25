<template>
	<div id = "reg">
		<div class="cover">
			<div class="return" @click="back"></div>
			<div class="reg_up">
				<input type="text" placeholder="Username" v-model="name">
				<input type="password" placeholder="Password" v-model="pass">
				<input type="text" placeholder="E-mail" v-model="email">
				<div class="vcode">
					<input type="text" placeholder="vercode" v-model="vcode">
					<div class="getcode">
						<div class="but" @click="toVcode" v-show="!start">获取验证码</div>
						<div class="but" v-show="start">{{parseInt(num/100)}}</div>
					</div>
				</div>
			</div>
			<div class="reg_down">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="注 册" @click.native="toReg"></v-btn>
				<p>Already has an account ?</p>
				<v-btn bgcolor="rgba(0,0,0,0)" bdcolor="white" color="white" words="登 录" @click.native="back"></v-btn>
			</div>
		</div>
		
	</div>	
</template>

<script>
import {isMail} from '../../../static/common.js'
import {isLegal} from '../../../static/common.js'
import {isRange} from '../../../static/common.js'
import vBtn from '../../components/partition/vbtn.vue'

function animate(_that) {
	_that.num --;
	if(_that.num > 0){
		window.requestAnimationFrame(animate);
	}	
}
export default {
	name : 'reg',
	components : {
		vBtn
	},
	methods : {
		back() {
			this.$router.push('/login');
		},
		toVcode() {
			var params = {};
			if(this.name.length) {
				if(isRange(this.name,0,12)){
					if(isMail(this.email)){
						if(isRange(this.pass,0,16)){
							params = {
								email : this.email,
								pass : this.pass,
								name :this.name
							};
							this.$http.post('http://139.199.205.91:8000/users/vcode',params,{ emulateJSON : true,withCredentials: true}).then(function(res) {
									if(res.body.error){
										this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
									}else {
										this.$store.commit('showpop',{'popif' : true,'words' : '验证码已经发至你的邮箱了哦~','type' : 1});
										this.start = true;
										window.requestAnimationFrame(this.change);
									}
							})
						}else {
							this.$store.commit("showpop",{'popif' : true,'words' : '密码为空或长度超过16', 'type' : 0});
						}
					}else {
						this.$store.commit("showpop",{'popif' : true,'words' : '邮箱不合法', 'type' : 0});
					}
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : '用户名最长为12','type' : 0});
				}
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '用户名不能为空','type' : 0});
			}
		},
		toReg() {
			if(isRange(this.name,0,12)) {
				if(isLegal(this.name)){
					if(isMail(this.email)){
						if(isRange(this.pass,0,24)){
							let encrypt = new JSEncrypt();
							encrypt.setPublicKey(this.key) 
							let pass = encrypt.encrypt(this.pass);
							let params = {
								email : this.email,
								pass : pass,
								name :this.name,
								vcode : this.vcode
							};
							this.$http.post('http://139.199.205.91:8000/users/reg',params,{ emulateJSON : true,withCredentials: true}).then(function(res) {
									if(res.body.error) {
										this.$store.commit('showpop',{'popif' : true,'words' : res.body.esult,'type' : 0});
									}else {
										this.$store.commit('showpop',{'popif' : true,'words' : '注册成功啦 快去登录吧~','type' : 1});
									}
								})
						}else {
							this.$store.commit('showpop',{'popif' : true,'words' : '密码不能为空','type' : 0});
						}
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : '邮箱不合法','type' : 0});
					}
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : '用户名不合法','type' : 0});
				}
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '用户名不能为空','type' : 0});
			}
		},
		change() {
			this.num --;
			if(this.num > 0) {
				window.requestAnimationFrame(this.change);
			}else {
				this.num = 18000;
				this.start = false;
			}
		}
	},
	data () {
		return {
			name : '',
			email : '',
			pass : '',
			vcode : '',
			num : 18000,
			start : false
		}
	},
	computed : {
		key() {
			return this.$store.state.selfinfo.pubkey;
		}
	}
}
</script>

<style scoped>
#reg {
	width: 100%;
	height: 100%;
	background: url('../../../static/log_bg.jpg') no-repeat;
	background-position: center;
	background-size: auto 100%;
	color: white;
	overflow: hidden;
}

#reg .reg_up {
	padding-top: 3rem;
	width: 100%;
	height: 50%;
}

#reg .reg_down {
	width: 100%;
	height: 50%;
}

#reg p {
	margin-top: 7%;
	margin-bottom: 7%;
}

.cover .return {
	width: 3rem;
	height: 3rem;
	position: absolute;
	background: url('../../../static/icons/return.png') no-repeat;	
	background-size: 70% auto;
	background-position: center;
	font-weight: bold;
	z-index: 5;
}

#reg .cover{
	width: 100%;
	height: 100%;
	background-color: rgba(35,112,153,0.1);
}
#reg input {
	border: none;
	margin-top: 2%;
	margin-bottom: 2%;
	border-bottom: 1px solid white;
	height: 18%;
	width: 73%;
	line-height: 3rem;
	color: white;
	text-align: center;
	outline: none;
	font-size: 1rem;
	background-color: rgba(0,0,0,0);
}

.cover .vcode {
	margin: 0 auto;
	width: 73%;
	height: 20%;
	color: white;
	text-align: center;
	margin-top: 3%;
	margin-bottom: 3%;
	/*border-bottom: 1px solid white;*/
}

#reg .cover .vcode input {
	margin:0 ;
	border: none;
	height: 100%;
	width: 50%;
	text-align: center;
	float: left;
	display: block;
	border-bottom: 1px solid white;
}

.cover .vcode .getcode {
	width: 50%;
	height: 100%;
	float: left;
}

.getcode .but {
	width: 80%;
	height: 2.5rem;
	background-color: rgba(0,0,0,0);
	margin: 0 auto;
	margin-top: 1vh;
	line-height:2.5rem;
	font-size: 0.8rem;
	border: 2px solid white;
}

input::-webkit-input-placeholder{
    color:white;
}
input::-moz-placeholder{
    color:white;
}
input:-moz-placeholder{
    color:white;
}
input:-ms-input-placeholder{
    color:white;
}
</style>