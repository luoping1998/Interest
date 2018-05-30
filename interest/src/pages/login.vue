<template>
	<div id="login">
		<div class="cover">
			<div class="return" v-show="!show" @click="back"></div>
			<div class="up-logo">
				<div class="inter"></div>
				<p>Enjoy everything and keep interesting</p>
			</div>
			<div class="up-info" v-show = "show">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="Log in with Email" @click.native = "withEmail">
				</v-btn>
				<v-btn bgcolor="rgb(35,112,153)" bdcolor="rgb(35,112,153)" color="white" words="Log in with Username" @click.native="withUsername">
				</v-btn>
				<p>Don't have an account ?</p>
				<v-btn bgcolor="rgba(0,0,0,0)" bdcolor="white" color="white" words="Sign up" @click.native="toReg">
				</v-btn>
			</div>
			<div v-show="withu||withe">
				<input type="text" placeholder="E-mail" v-show = "withe" v-model="email">
				<input type="text" placeholder="Username" v-show="withu" v-model="user">
				<input type="password" placeholder="Password"  v-model="pass">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="To Login" @click.native="toLogin" v-show="!log"></v-btn>
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" load="true" v-show="log" ></v-btn>
			</div>
			<div class="skip" @click = "skip">skip</div>
		</div>
	</div>
</template>

<script>
import vBtn from '../components/partition/vbtn.vue'
import {blobToBase64} from '../../static/blobToBase.js'

export default {
	name : 'Login',
	components : {
		vBtn
	},
	methods : {
		skip() {
			this.$router.push('/index/home');
		},
		withEmail() {
			this.withe = true;
			this.show = false;
			this.withu = false;
		},
		withUsername() {
			this.withe = false;
			this.show = false;
			this.withu = true;
		},
		toLogin() {
			this.log = true;
			var user = this.user;
			var email = this.email;
			var pass = this.pass;
			var _this = this;
			var params = {};
			if(this.withe) {
				params = {
					'email' : email,
					'pass' : pass
				}
			}else {
				params = {
					'name' : user,
					'pass' : pass
				}
			}
			this.$http.post('http://localhost:8000/users/log', params, { emulateJSON : true,withCredentials: true}).then(function(res) {
					if(!res.body.error) {
						// console.log(res.body);
						sessionStorage.setItem('pic',JSON.stringify(res.body.pic));
						sessionStorage.setItem('user',JSON.stringify(res.body.infor));
						this.$router.push('/index/home');			
					}else{
						this.log = false;
					}
				})
		},
		back() {
			this.show = true;
			this.withe = false;
			this.withu = false;
		},
		toReg() {
			this.$router.push('/reg');
		}
	},
	data() {
		return {
			withe : false,
			withu : false,
			show : true,
			email : '',
			pass : '',
			user :'',
			log: false
		}
	}
}
</script>

<style scoped>
#login {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100vh;
	color: white;
	background-image: url('../../static/log_bg.jpg');	
	background-size: auto 100%;
	background-position: center;
}
#login .cover {
	width: 100%;
	height: 100%;
	background-color: rgba(35,112,153,0.1);
}

.cover .up-logo {
	width: 100%;
	height: 45%;
	overflow: hidden;
}

.cover .withe {
	width: 100%;
	height: 50%;
	overflow: hidden;
}

.cover .return {
	width: 3rem;
	height: 8%;
	position: absolute;
	background: no-repeat URL('../../static/icons/return.png');	
	background-size: 55% auto;
	background-position: center;
	font-weight: bold;
	z-index: 5;
}

.up-logo .inter {
	width: 100%;
	height: 20%;
	margin-top: 34%;
	background: no-repeat URL('../../static/inter2.png');	
	background-size: 60% auto;
	background-position: center;
}

#login p {
	margin-top: 10%;
}

#login .skip {
	text-decoration: underline;
	position: absolute;
	width: 4rem;
	height: 3%;
	right: 0.5rem;
	bottom: 1rem;
}

#login input {
	border: none;
	margin-top: 1%;
	margin-bottom: 3%;
	border-bottom: 1px solid white;
	height: 4rem;
	width: 73%;
	line-height: 4rem;
	color: white;
	text-align: center;
	outline: none;
	font-size: 1rem;
	background-color: rgba(0,0,0,0);
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