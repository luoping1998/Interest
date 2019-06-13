<template>
	<div id="fpass" class="outer-box">
		<div class="cover">
			<div class="return" @click="back" />
			<div class="up-logo">
				<img class="inter" src="../../../static/inter2.png" />
				<p style="font-size:1.1rem">Enjoy everything and keep interesting</p>
			</div>
			<div class="f-bd" v-show="check">
				<div class="f-mess">
					<input type="text" placeholder="请输入E-mail" v-model="email" />
				</div>
				<div class="f-mess">
					<input type="text" placeholder="请输入用户名" v-model="uname" />
				</div>
				<div class="vcode">
					<input type="text" placeholder="验证码" v-model="vcode" />
					<div class="btn" v-if="!start" @click="getcode">获取验证码</div>
					<div class="btn" v-else>{{ parseInt(num/100) }}</div>
				</div>
				<br/>
				<v-btn
					v-show="!loading"
					bgcolor="white"
					bdcolor="white"
					color="rgb(35,112,203)"
					words="开 始 验 证"
					@click.native="tocheck"
				/>
				<v-btn
					v-show="loading"
					bgcolor="white"
					bdcolor="white" 
					color="rgb(35,112,203)" 
					@click.native="changepass"
					load="true"
				/>
			</div>

			<div class="f-bd" v-if="change">
				<div class="f-mess">
					<input type="password" placeholder="请输入新密码" v-model="pass" />
				</div>
				<div class="f-mess">
					<input type="password" placeholder="重新确认密码" v-model="npass" />
				</div>
				<v-btn
					v-show="!loading"
					bgcolor="white"
					bdcolor="white" 
					color="rgb(35,112,203)" 
					words="确 认 修 改"  
					@click.native="changepass"
				/>
				<v-btn
					v-show="loading"
					bgcolor="white"
					bdcolor="white" 
					color="rgb(35,112,203)" 
					@click.native="changepass"
					load="true"
				/>
			</div>
			
		</div>
	</div>	
</template>

<script>
import { isMail } from '../../../static/common.js';
import vBtn from '../../components/partition/vbtn.vue'
import '../../styles/outer.css';

function animate(_that) {
	_that.num --;
	if(_that.num > 0){
		window.requestAnimationFrame(animate);
	}	
}

export default {
	name : 'fpass',
	components : {
		vBtn
	},
	methods : {
		back() {
			this.$router.go(-1);
		},
		clear() {
			this.uname = '';
			this.email = '';
			this.vcode = '';
			this.pass = '';
			this.npass = '';
		},
		showErrorPop(mes) {
			this.$store.commit('showpop', {
				popif: true,
				words: mes,
				type: 0
			});
		},
		showSucPop(mes) {
			this.$store.commit('showpop', {
				popif: true,
				words: mes,
				type: 1
			});
		},
		getcode() {
			const { email, uname } = this;
			if (!email.length) {
				this.showErrorPop('请输入邮箱！');
				return;
			}else if (!uname.length) {
				this.showErrorPop('请输入用户名！');
				return;
			}
			if(isMail(email)) {
				this.$http.get('http://139.199.205.91:8000/users/code',{  
			    params : {
			      email: email,
			      name: uname
			    },
			    credentials : true
			  }).then((res) => {
			    if(res.body && res.body.error) {
			    	this.showErrorPop(res.body.result);
			  	}else {
			  		this.showSucPop('验证码已经发到邮箱了哦~');
			  		this.start = true;
						window.requestAnimationFrame(this.count);
			  	}
			  })
			}else {
				this.showErrorPop('邮箱不合法');
				return ;
			}
		},
		tocheck() {
			const { uname, email, vcode } = this;
			if (!email.length) {
				this.showErrorPop('请输入邮箱！');
				return;
			}else if (!uname.length) {
				this.showErrorPop('请输入用户名！');
				return;
			}else if(!vcode.length) {
				this.showErrorPop('请输入验证码！');
			}
			if(isMail(email)) {
				this.loading = true;
				this.$http.get('http://139.199.205.91:8000/users/check', {  
			    params : { vcode },
		      credentials : true
			  }).then((res)=>{
					this.loading = false;
	      	if(res.body && res.body.error) {
		      	this.showErrorPop(res.body.result);
			  	}else {
						this.check = false;
						this.change = true;
	      	}
	      })
			}else {
				this.showErrorPop('邮箱不合法');
			}
			this.clear();
			this.num = 18000;
			this.start = false;
		},
		changepass(){
			const { pass, npass } = this;
			if (!pass.length && !npass.length) {
				this.showErrorPop('请输入密码!');
				return ;
			}else if (this.pass.length >= 25) {
				this.showErrorPop('密码不能超过24位!');
				return ;
			} else if (this.pass !== this.npass) {
				this.showErrorPop('两次输入密码不一致!');
				return ;
			}
			this.loading = true;
			let encrypt = new JSEncrypt();
			encrypt.setPublicKey(this.key);
			const password = encrypt.encrypt(this.pass);
			const params = { pass: password };
			this.$http.post('http://139.199.205.91:8000/users/cpass',
				params,
				{
					emulateJSON: true,
					withCredentials: true
			}).then((res)=>{
				if(res.body && res.body.error) {
					this.showErrorPop(res.body.result);
				}else {
					this.showSucPop('修改密码成功!');
					this.$store.commit('logf');
					sessionStorage.clear();
					this.$router.push('/');
				}
			})
			this.clear();
		},
		count() {
			this.num --;
			if(this.num > 0) {
				window.requestAnimationFrame(this.count);
			}else {
				this.num = 18000;
				this.start = false;
			}
		}
	},
	data() {
		return {
			check: true,
			change: false,
			uname: '',
			email: '',
			vcode: '',
			pass: '',
			npass: '',
			num: 18000,
			start: false,
			loading: false
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
  #fpass .f-bd {
	  width: 100%;
		height: 60%;
		display: flex;
		flex-direction: column;
		align-items: center;
  }

  .f-bd .f-mess {
	  width: 100%;
	}
</style>