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
					star : this.$route.params.id,
					fans : JSON.parse(sessionStorage.getItem('user')).id
				},
				credentials : true
			}).then(function (res) {
				console.log(res);
				if(res.body.error) {
					//弹框
				}else {
					this.followed = true
				}
			})
		},
		unfollow() {

		}
	},
	components :{
		scard
	}, 
	mounted() {
	    this.$http.get('http://localhost:8000/users/chfollow', {
	      params : {
	        'star' : this.$route.params.id,
	        'fans' : JSON.parse(sessionStorage.getItem('user')).id
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
  },
}
</script>

<style scoped>
#info-msg {
	width: 100%;
	height: 50%;
	position: relative;
	top:3vh;
}
#info-msg .uname {
	width: 100%;
	height: 10vh;
	line-height: 10vh;
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
	height: 8vh;
	color: gray;
	text-align: center;
	font-size: 1rem;
}

#info-msg .follow {
	width: 24vw;
	height: 5vh;
	background-color: pink;
	position: absolute;
	right: 4vh;
	top: -5vh;
	font-size: 1rem;
	letter-spacing: 0.2rem;
	color: white;
	line-height: 5vh;
	font-weight: bold;
}
</style>