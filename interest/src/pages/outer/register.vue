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
						<div class="but" @click="toVcode" v-show="!start">get vercode</div>
						<div class="but" v-show="start">{{num}}</div>
					</div>
				</div>
			</div>
			<div class="reg_down">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="Sign up" @click.native="toReg"></v-btn>
				<p>Already has an account ?</p>
				<v-btn bgcolor="rgba(0,0,0,0)" bdcolor="white" color="white" words="Log in" @click.native="back"></v-btn>
			</div>
		</div>
		
	</div>	
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import {isMail} from '../../../static/common.js'
import {isLegal} from '../../../static/common.js'
import {isRange} from '../../../static/common.js'
import vBtn from '../../components/partition/vBtn.vue'
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
			if(isRange(this.name,0,12)) {
				if(isLegal(this.name)){
					if(isMail(this.email)){
						if(isRange(this.pass,0,16)){
							params = {
								email : this.email,
								pass : this.pass,
								name :this.name
							};
							this.$http.post('http://localhost:8000/users/vcode',params,{ emulateJSON : true,withCredentials: true}).then(function(res) {
									if(res.body.error){
										bus.$emit('pop',{'popif' : true,'popwords' : res.body.msg,'poptype' : 0});
									}else {
										bus.$emit('pop',{'popif' : true,'popwords' : '验证码已经发至你的邮箱了哦~','poptype' : 1});
									}
							})
						}else {
						bus.$emit('pop',{'popif' : true,'popwords' : '密码不能为空','poptype' : 0});
						}
					}else {
						bus.$emit('pop',{'popif' : true,'popwords' : '邮箱不合法','poptype' : 0});
						// console.log('email inlegal');
					}
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : '用户名不合法','poptype' : 0});
					// console.log('username inlegal');
				}
			}else {
				bus.$emit('pop',{'popif' : true,'popwords' : '用户名不能为空','poptype' : 0});
				// console.log('username is empty');
			}
		},
		toReg() {
			var params = {};
			if(isRange(this.name,0,12)) {
				if(isLegal(this.name)){
					if(isMail(this.email)){
						if(isRange(this.pass,0,16)){
							params = {
								email : this.email,
								pass : this.pass,
								name :this.name,
								vcode : this.vcode
							};
							this.$http.post('http://localhost:8000/users/reg',params,{ emulateJSON : true,withCredentials: true}).then(function(res) {
									if(res.body.error) {
									bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
									}else {
									bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 1});
									}
							})
						}else {
							bus.$emit('pop',{'popif' : true,'popwords' : '密码不能为空','poptype' : 0});
							// console.log('pass is empty');
						}
					}else {
						bus.$emit('pop',{'popif' : true,'popwords' : '邮箱不合法','poptype' : 0});
						// console.log('email inlegal');
					}
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : '用户名不合法','poptype' : 0});
					// console.log('username inlegal');
				}
			}else {
				bus.$emit('pop',{'popif' : true,'popwords' : '用户名不能为空','poptype' : 0});
				// console.log('username is empty');
			}
		}
		//,
		// begin() {
		// 	this.start = true;
		// 	this.num = 180;
		// 	var timer = setInterval(function(){
		// 		if(this.num < 0){
		// 			this.start = false;
		// 			clearInterval(timer);
		// 		}else {
		// 			this.num --;
		// 		}
		// 	},1000);
		// }
	},
	data () {
		return {
			name : '',
			email : '',
			pass : '',
			vcode : '',
			num : 180,
			start : false
		}
	}
}
</script>

<style scoped>
#reg {
	width: 100%;
	height: 100vh;
	background: url('../../../static/log_bg.jpg') no-repeat;
	background-position: center;
	background-size: auto 100%;
	color: white;
	overflow: hidden;
}

#reg .reg_up {
	padding-top: 15%;
	width: 100%;
	height: 47%;
}

#reg .reg_down {
	width: 100%;
	height: 50%;
}

#reg p {
	margin-top: 10%;
	margin-bottom: 10%;
}

.cover .return {
	width: 15%;
	height: 8%;
	position: absolute;
	background: no-repeat URL('../../static/icons/return.png');	
	background-size: 55% auto;
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
	margin-top: 5%;
	margin-bottom: 2%;
	border-bottom: 1px solid white;
	height: 3rem;
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
	height: 3rem;
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
	height: 80%;
	background-color: rgba(0,0,0,0);
	margin: 0 auto;
	margin-top: 1vh;
	line-height:6vh;
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