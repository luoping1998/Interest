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
import { bus } from '../../static/js/bus.js'
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
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.msg,'poptype' : 0});
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.msg,'poptype' : 1});
					this.followed = true;
					bus.$emit('updmy');
					bus.$off('updmy');

				}
			})
		},
		unfollow() {
			var params = {
				star : this.$route.params.id
			}
			// console.log('click');
			this.$http.get('http://localhost:8000/users/unfollow',{
				params : params,
				credentials : true
			}).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 1});
					this.followed = false;
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
	    	// console.log(res.body);
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
  // beforeCreate() {
  //   console.log('beforeCreate-------------friend_down');
  // },
  // created () {
  //   //检测有没有登录
  //   console.log('Created------------------friend_down');
  // },
  // beforeMount() {
  //   console.log('beforeMount--------------friend_down');
  // },
  // mounted() {
  //   console.log('Mounted------------------friend_down');
  // },
  // beforeUpdate() {
  //   console.log('beforeUpdate-------------friend_down');
  // },
  // Updated() {
  //   console.log('Updated------------------friend_down');
  // },
  // beforeDestroy() {
  // 	// bus.$off('updmy',this.toUpdate);
  //   console.log('beforeDestroy------------friend_down');
  // },
  // destroyed() {
  //   console.log('Destroyed----------------friend_down');
  // }
}
</script>

<style scoped>
#info-msg {
	width: 100%;
	height: 50%;
	position: relative;
	top:5%;
}
#info-msg .uname {
	width: 100%;
	height: 10%;
	/*line-height: ;*/
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