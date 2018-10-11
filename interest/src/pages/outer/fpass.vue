<template>
	<div id = "fpass">
		<div id="fpass">
	    	<div class="back" @click="back"></div>
	    	<div class="f-logo"></div>
	    	<div class="f-bd" v-if="check">
	      		<div class="f-mess">
	        		<input type="text" placeholder="请输入E-mail" v-model="email" />
	      		</div>
	      		<div class="f-mess">
		        	<input type="text" placeholder="请输入用户名" v-model="uname" />
	      		</div>
	      		<div class="check">
	        		<input type="text" placeholder="验证码" v-model="vcode">
	        		<div class="c-btn" v-if="!start" @click="getcode">获取验证码</div>
	        		<div class="c-btn" v-if="start">{{parseInt(num/100)}}</div>
	      		</div>
	      		<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,203)" words="开 始 验 证" @click.native="tocheck"></v-btn>
	    	</div>

	    	<div class="f-bd" v-else="change">
	    		<div class="f-mess">
	        		<input type="password" placeholder="请输入新密码" v-model="pass" />
	      		</div>
	      		<div class="f-mess">
		        	<input type="password" placeholder="重新确认密码" v-model="npass" />
	      		</div>
	      		<v-btn bgcolor="white" bdcolor="white" color="rgb(35,112,203)" words="确 认 修 改"  @click.native="changepass"></v-btn>
	    	</div>
	    	
		</div>	
	</div>
</template>

<script>
import {isMail} from '../../../static/common.js'
import vBtn from '../../components/partition/vbtn.vue'

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
		getcode() {
			if(isMail(this.email)&&this.email&&this.uname) {
				this.$http.get('http://139.199.205.91:8000/users/code',{  
			        params : {
			          email : this.email,
			          name : this.uname
			        },
			        credentials : true
			      }).then((res) => {
			      	console.log(res);
			      	if(res.body.error) {
			      		this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
			      	}else {
			      		this.$store.commit('showpop',{'popif' : true,'words' : '验证码已经发到邮箱了哦~','type' : 1});
			      		this.start = true;
						window.requestAnimationFrame(this.count);
			      	}
			    })
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '信息不完整！','type' : 0});
				return ;
			}
		},
		tocheck() {
			if(this.uname&&this.email&&this.vcode) {
				this.$http.get('http://139.199.205.91:8000/users/check',{  
			        params : {
			          vcode : this.vcode
			        },
			        credentials : true
			      }).then((res)=>{
			      	if(res.body.error) {
			      		this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
			      	}else {
			      		this.check = false;
			      	}
			      })
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '信息不完整','type' : 0});
			}
			this.clear();
			this.num = 18000;
			this.start = false;
		},
		changepass(){
			if(this.pass.length<25 && (this.pass === this.npass) && this.pass) {
				let encrypt = new JSEncrypt();
				encrypt.setPublicKey(this.key);
				let pass = encrypt.encrypt(this.pass);
				// console.log(pass,this.pass);
				let params = {
					'pass' : pass
				}
				this.$http.post('http://139.199.205.91:8000/users/cpass',params,{ emulateJSON : true,withCredentials: true}).then((res)=>{
					console.log(res);
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : '修改密码成功','type' : 1});
						this.$router.push('/login');
					}
				})
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '两次输入密码不一致','type' : 0});
			}
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
			check : true,
			change : false,
			uname : '',
			email : '',
			vcode : '',
			pass : '',
			npass : '',
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
	#fpass{
		width: 100%;
		height: 100%;
		background: url('../../../static/log_bg.jpg') no-repeat;
		background-position: center;
		background-size: auto 100%;
		color: white;
		overflow: hidden;
		z-index: 1;
	}
    #fpass .back {
    	width: 3rem;
    	height: 3rem;
    	background:url('../../../static/icons/return.png') no-repeat;
	    background-size: auto 60%;
	    background-position: center;
    }
    #fpass .f-logo {
	    width: 100%;
	    height: 25%;
	    background:url('../../../static/inter2.png') no-repeat;
	    background-size: auto 80%;
	    background-position: center;
    }
    #fpass .f-bd {
	    width: 100%;
	    height: auto;
	    color: white;
	    margin-bottom: 1.5rem;
    }

    .f-bd .f-mess {
	    width: 65%;
	    height: 3rem;
	    margin:0 auto;
	    margin-bottom: 1rem;
    }
    .f-mess input {
    	color: white;
	    width: 100%;
	    height: 2rem;
	    background-color: rgba(0,0,0,0);
	    outline: none;
	    border: none;
	    border-bottom: 3px solid white;
	    font-size: 1rem;
	    line-height: 3rem;
	    padding: 0.5rem;
    }
    .f-bd .check {
	    width: 65%;
	    height: 3rem;
	    margin: 0 auto;
	    margin-bottom: 1rem;
    }

    .check .c-btn {
	    width: 45%;
	    height: 2.4rem;
	    margin-top: 0.3rem;
	    border: 3px solid white;
	    line-height: 2.4rem;
	    float: right;
    }

    .check input {
    	color: white;
	    width: 45%;
	    float: left;
	    height: 100%;
	    display: block;
	    background-color: rgba(0,0,0,0);
	    outline: none;
	    border: none;
	    text-align:center;
	    border-bottom: 2px solid white;
	    font-size: 0.9rem;
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