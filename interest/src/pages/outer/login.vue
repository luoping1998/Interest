<template>
	<div id="login">
		<div class="cover">
			<div class="return" v-show="!show" @click="back"></div>
			<div class="up-logo">
				<img class="inter" src="../../../static/inter2.png"/>
				<p style="font-size:1.1rem">Enjoy everything and keep interesting</p>
			</div>
			<div class="up-info" v-show = "show">
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="邮箱登录" @click.native = "withEmail">
				</v-btn>
				<v-btn bgcolor="rgb(35,112,203)" bdcolor="rgb(35,112,203)" color="white" words="用户名登录" @click.native="withUsername">
				</v-btn>
				<p style="margin-top:10%;font-size:0.9rem;margin-bottom:5%;">还没有账号 ?</p>
				<v-btn bgcolor="rgba(0,0,0,0)" bdcolor="white" color="white" words="注 册" @click.native="toReg">
				</v-btn>
			</div>
			<div v-show="withu||withe">
				<input type="text" placeholder="E-mail" v-show = "withe" v-model="email">
				<input type="text" placeholder="Username" v-show="withu" v-model="user">
				<input type="password" placeholder="Password"  v-model="pass">
				<p style="margin-bottom:10%;font-size:0.8rem;text-shadow: 0.4rem 0.4rem 1.6rem #dbe9fe;" @click="findpass"><u>忘记密码? </u></p>
				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" words="登 录" @click.native="toLogin" v-show="!log"></v-btn>

				<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,153)" load="true" v-show="log" ></v-btn>
			</div>
			<div class="skip" @click = "skip">跳过</div>
		</div>
	</div>
</template>

<script>
import vBtn from '../../components/partition/vbtn.vue'
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
			this.$http.post('http://139.199.205.91:8000/users/log', params, { emulateJSON : true,withCredentials: true}).then(function(res) {
				if(!res.body.error) {
		        	this.$store.commit("saveinfo",res.body.infor);
		        	this.$store.commit("savepic",res.body.pic);
					this.$store.dispatch("getownMessages");
	        		this.$store.commit("showpop",{'popif' : true,'words' : res.body.msg, 'type' : 1});
					this.$router.push('/index/home');
					this.$store.commit('logt');
					this.$store.dispatch({
						'type' : 'getprompts'
					});	
					this.user = '';
					this.email = '';
					this.pass = '';	
				}else{
					this.log = false;
	        		this.$store.commit("showpop",{'popif' : true,'words' : res.body.result, 'type' : 0});
				}
			})
			
		},
		back() {
			this.show = true;
			this.withe = false;
			this.withu = false;
			this.user = '';
			this.email = '';
			this.pass = '';
		},
		toReg() {
			this.$router.push('/reg');
		},
		findpass() {
			this.$router.push('/fpass');
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
	height: 100%;
	color: white;
	background-image: url('../../../static/log_bg.jpg');	
	background-size: auto 100%;
	background-position: center;
}
#login .cover {
	width: 100%;
	height: 100%;
	background-color: rgba(37,117,252,0.1);
}

.cover .up-logo {
	padding-top: 10%;
	width: 100%;
	height: 33%;
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
	background: url('../../../static/icons/return.png') no-repeat;	
	background-size: 55% auto;
	background-position: center;
	font-weight: bold;
	z-index: 5;
}

.up-logo .inter {
	display: block;
	margin:0 auto;
	width: 60%;
	height: auto;
}

#login .skip {
	text-decoration: underline;
	position: absolute;
	width: 4rem;
	height: 3%;
	right: 0;
	bottom: 5%;
}

#login input {
	border: none;
	margin-top: 1%;
	margin-bottom: 3%;
	border-bottom: 2px solid white;
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