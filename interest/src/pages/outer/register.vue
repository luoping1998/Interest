<template>
	<div id="reg" class="outer-box">
		<div class="cover">
			<div class="return" @click="back" />
			<div class="reg_box">
				<input type="text" placeholder="Username" v-model="name">
				<input type="password" placeholder="Password" v-model="pass">
				<input type="text" placeholder="E-mail" v-model="email">
				<div class="vcode">
					<input type="text" placeholder="vercode" v-model="vcode">
					<div class="btn" @click="toVcode" v-show="!start">获取验证码</div>
					<div class="btn" v-show="start">{{parseInt(num/100)}}</div>
				</div>
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
import '../../styles/outer.css';

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
										this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
									}else {
										this.$store.commit('showpop',{'popif' : true,'words' : '注册成功啦 快去登录吧~','type' : 1});
										this.$router.push('/login');
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
