<template>
	<div id="finfo-msg">
		<div v-if="logif && (me != star)">
			<div class="follow" @click="follow" v-show = "!followed">+ 关 注</div>
			<div class="follow" @click="unfollow" v-show = "followed">√已关注</div>
		</div>
		<div class="user">
			<div class="uname">{{infor.u_name}}
				<span :class="infor.sex=='女'?'ugirl':'uboy'">{{infor.sex}}</span>
			</div>
		</div>
		<div class="intro">{{infor.signature}}</div>
		<p class="email" v-show="infor.show == 1">{{infor.email}}</p>
		<p class="email" v-show="infor.show == 0">该用户邮箱设置为隐藏</p>
		<scard :infor="infor"></scard>
	</div>
</template>

<script>
import scard from './partition/scard.vue'
export default {
	name: 'infomsg',
	props :['infor'],
	data() {
		return {
			followed : false,
			star: this.$route.params.id,
			me: ''
		}
	},
	computed : {
		logif () {
			return this.$store.state.selfinfo.logif;
		}
	},
	methods : {
		follow() {
			this.$http.get('http://139.199.205.91:8000/users/follow',{  
				params : {
					star : this.$route.params.id
				},
				credentials : true
			}).then(function (res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.msg,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.msg,'type' : 1});
					this.followed = true;
					this.$store.dispatch({
						type : 'getownInfo'
					});
				}
			})			
		},
		unfollow() {
			var params = {
				star : this.$route.params.id
			}
			this.$http.get('http://139.199.205.91:8000/users/unfollow',{
				params : params,
				credentials : true
			}).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
					this.followed = false;
					this.$store.dispatch({
						type : 'getownInfo'
					});
				}
			})
		}
	},
	components :{
		scard
	}, 
	created() {
		this.me = this.$store.selfinfo.info.id;
	},
	mounted() {
		if(this.$store.state.selfinfo.logif) {
			this.$http.get('http://139.199.205.91:8000/users/chfollow', {
		      params : {
		        'star' : this.$route.params.id
		      },
		      credentials :true
		    }).then(function(res) {
		      if(res.body.error) {
		        this.followed = false;
		      }else {
		        if(res.body.result.length == 0) {
		          this.followed = false;
		        }else {
		          this.followed = true;
		        }
		      }
		    })
		}	    
 	}
}
</script>

<style scoped>
#finfo-msg {
	width: 100%;
	height: 40%;
}

#finfo-msg .uname {
	width: 100%;
	height: 25%;
	text-align: center;
	margin-top: 0.5rem;
	font-size: 1.5rem;
}

.uname .uboy {
	font-size: 0.8rem;
	background-color: rgb(126,180,255);
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}

.uname .ugirl {
	font-size: 0.8rem;
	background-color: pink;
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}

#finfo-msg .intro {
	width: 80%;
	margin:0 auto;
	height: auto;
	max-height: 4rem;
	color: gray;
	text-align: center;
	font-size: 1rem;
	line-height: 2.5rem;
}

#finfo-msg .follow {
	width: 22%;
	height: 2rem;
	border: 2px solid black;
	position: absolute;
	right: 10%;
	top: 43%;
	font-size: 0.9rem;
	letter-spacing: 0.2rem;
	line-height: 2rem;
	font-weight: bold;
}

#finfo-msg .email {
	width: 80%;
	margin:0 auto;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	color: gray;	
}
</style>