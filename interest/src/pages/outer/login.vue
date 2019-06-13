<template>
	<div id="login" class="outer-box">
		<div class="cover">
			<div class="return" v-show="!show" @click="back" />
			<div class="up-logo">
				<img class="inter" src="../../../static/inter2.png" />
				<p style="font-size:1.1rem">Enjoy everything and keep interesting</p>
			</div>
			<div class="up-info" v-if="show">
				<v-btn
					bgcolor="white"
					bdcolor="white"
					color="rgb(35,112,153)"
					words="邮箱登录"
					@click.native = "withEmail"
				/>
				<v-btn
					bgcolor="rgb(35,112,203)"
					bdcolor="rgb(35,112,203)"
					color="white"
					words="用户名登录"
					@click.native="withUsername"
				/>
				<p class="no-account">还没有账号 ?</p>
				<v-btn 
					bgcolor="rgba(0,0,0,0)"
					bdcolor="white"
					color="white"
					words="注 册"
					@click.native="toReg"
				/>
			</div>
			<div v-else-if="withu || withe" class="up-form">
				<input type="text" placeholder="E-mail" v-show="withe" v-model="email" />
				<input type="text" placeholder="Username" v-show="withu" v-model="user" />
				<input type="password" placeholder="Password" v-model="pass" />
				<p class="find-pass" @click="findpass">
					<u>忘记密码? </u>
				</p>
				<v-btn
					bgcolor="white"
					bdcolor="white"
					color="rgb(35,112,153)"
					words="登 录"
					@click.native="toLogin"
					v-if="!log"
				/>
				<v-btn
					bgcolor="white"
					bdcolor="white"
					color="rgb(35,112,153)"
					load="true"
					v-else
				/>
			</div>
			<div class="skip" @click ="skip">跳过</div>
		</div>
	</div>
</template>

<script>
import { JSEncrypt } from '../../../static/jsencrypt.min.js';
import vBtn from '../../components/partition/vbtn.vue';

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
		showPopError(mes) {
			this.$store.commit("showpop",{
				popif: true,
				words: mes,
				type: 0
			});
		},
		toLogin() {
			const { withe, withu, user, email, pass: password } = this;
			if (!password.length) {
				this.showPop('请输入密码！');
				return;
			}
			let params = {};
			const encrypt = new JSEncrypt();
			encrypt.setPublicKey(this.key);
			const pass = encrypt.encrypt(this.pass);

			if (withe && !email.length) {
				this.showPop('请输入邮箱！');
				return;
			}else if(withe) {
				this.log = true;
				params = {
					email,
					pass
				};
				console.log('邮箱');
			}

			if(withu && !user.length) {
				this.showPop('请输入用户名！');
				return;
			}else if(withu) {
				this.log = true;
				params = {
					name: user,
					pass
				}
				console.log('用户名');
			}

			this.$http.post('http://139.199.205.91:8000/users/log',
				params,
				{
					emulateJSON : true,
					withCredentials: true,
					_timeout : 5000
				}
			).then(function(res) {
				this.log = false;
				if(!res.body.error) {
					this.$store.commit('logt');
			    this.$store.commit("saveinfo",res.body.infor);
			    this.$store.commit("savepic",res.body.pic);
		      this.$store.commit("showpop",{
						popif: true,
						words: res.body.msg, 'type' : 1
					});
		  		this.$router.push('/index/home');
					this.$store.dispatch({
						'type' : 'getprompts'
					});	
					this.user = '';
					this.email = '';
					this.pass = '';	
				}else{
					this.showPopError(res.body.result);
				}
			},function(err) {
				this.log = false;
				this.showPopError('网络请求超时,请重试');
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
	},
	computed : {
		key() {
			return  this.$store.state.selfinfo.pubkey;
		}
	}
}
</script>

<style scoped>
@import '../../styles/outer.css';
.cover .withe {
	width: 100%;
	overflow: hidden;
}

.cover .no-account {
	margin-top:10%;
	margin-bottom:5%;
	font-size:0.9rem;
}

.cover .find-pass {
	padding: 1.5rem;
	font-size:0.8rem;
	text-shadow: 0.4rem 0.4rem 1.6rem #dbe9fe;
	cursor: pointer;
}

#login .skip {
	text-decoration: underline;
	position: absolute;
	width: 4rem;
	height: 3%;
	right: 0;
	bottom: 5%;
	cursor: pointer;
}

.up-info {
	width: 100%;
	height: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.up-form {
	width: 100%;
	height: 60%;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	align-items: center;
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