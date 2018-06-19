<template>
	<div id="info-msg">
		<div class="follow" @click="follow" v-show = "!followed">关 注</div>
		<div class="follow" @click="unfollow" v-show = "followed">√已关注</div>
		<div class="user">
			<div class="uname">{{infor.u_name}}
				<span class="ulevel">LV{{infor.u_level}}</span>
			</div>
		</div>
		<div class="intro">{{infor.signature}}</div>
		<scard :infor="infor"></scard>
	</div>
</template>

<script>
// import { bus } from '../../static/js/bus.js'
import scard from './partition/scard.vue'
export default {
	name: 'infomsg',
	props :['infor'],
	data() {
		return {
			followed : false
		}
	},
	methods : {
		follow() {
			this.$http.get('http://localhost:8000/users/follow',{  
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
			this.$http.get('http://localhost:8000/users/unfollow',{
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
	mounted() {
	    this.$http.get('http://localhost:8000/users/chfollow', {
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
</script>

<style scoped>
#info-msg {
	margin-top: 1rem;
	width: 100%;
	height: 45%;
	position: relative;
	top:5%;
}

#info-msg .uname {
	width: 100%;
	height: 10%;
	text-align: center;
	font-size: 1.7rem;
}

.uname .ulevel {
	font-size: 0.2rem;
	background-color: pink;
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}

#info-msg .intro {
	width: 80%;
	margin:0 auto;
	height: 16%;
	color: gray;
	text-align: center;
	font-size: 1rem;
	line-height: 2.5rem;
}

#info-msg .follow {
	width: 24%;
	height: 2.3rem;
	background-color: pink;
	position: absolute;
	right: 1.5rem;
	top: -3rem;
	font-size: 1rem;
	letter-spacing: 0.2rem;
	color: white;
	line-height: 2.3rem;
	font-weight: bold;
}
</style>