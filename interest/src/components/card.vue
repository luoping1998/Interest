<template>
	<div class="card" @click.stop="showdetails">
		<div class="i-up">
			<div class="i-img" :style="note" @click.stop="mendetails"></div>
			<div class="i-info">
				<div class="i-id">{{info.u_name}}</div>
				<div class="i-date">{{new Date(info.date).Format("yyyy-MM-dd HH:mm:ss")}}</div>
			</div>
			<div v-show="show" class="del" @click.stop="todel">删除</div>
		</div>
		<div class="i-down">
			<div class="i-origin" v-if="info.type"><span style="color:black;font-size:0.9rem;">转发自 </span>{{info.o_name}}：<span style="color:black;font-size:0.9rem;">{{info.title}} </span></div>
			<div class="i-msg">
				<p>{{info.content}}</p>
				<div class="showimgs">
					<i-img v-for="(item,index) in imgs" :url="item" :key="index"></i-img>
				</div>
			</div>
			<div class="i-choice" @click.stop>
				<i-con :nsrc="nShare" :asrc="nShare" @click.native="showshare" :count="info.Snum"></i-con>
				<i-con :nsrc="nComent" :asrc="nComent" @click.native="comment" :count="info.Cnum"></i-con>
				<i-con :nsrc="nLike" :asrc="aLike" @click.native="like" :count="info.Lnum"></i-con>
			</div>
			<div class="i-comment" @click.stop v-show="tocmt">
				<input type="text" class="i-content" v-model="content">
				<div class="i-send" @click="send">发表</div>
			</div>
			<div class="i-comment" @click.stop v-show="toshare">
				<input type="text" class="i-content" v-model="scont">
				<div class="i-send" @click="share">转发</div>
			</div>
		</div>
	</div>
</template>

<script>
import iCon from './partition/i-like.vue'
import iImg from './i-img.vue'
export default {
	name : 'card',
	components:{
		iCon,
		iImg
	},
	props:['imgsrc','info','show','imgs'],
	data: function() {
		return {
			nLike : require('../../static/icons/n-like.png'),
			aLike : require('../../static/icons/a-like.png'),
			nShare : require('../../static/icons/n-share.png'),
			aShare : require('../../static/icons/a-share.png'),
			nComent :require('../../static/icons/n-coment.png'),
			aComent :require('../../static/icons/a-coment.png'),
			note : {
				background: "url(" + this.imgsrc + ") no-repeat",
            	backgroundSize: "100% auto",
            	backgroundPosition: "center"
			},
			tocmt : false,
			content : '',
			scont: '',
			toshare : false
		}
	},
	methods : {
		showdetails() {
			this.$router.push({ name : 'Msgdetails' , params : {id : this.info.mgsid}});
		},
		mendetails() {
			if(this.info.id === JSON.parse(sessionStorage.getItem('user')).id) {
				this.$router.push('/index/myself');
			}else{
				this.$router.push({ name : 'Frinfo' , params : {id : this.info.u_id}});
			}
		},
		todel() {
			this.$http.get('http://139.199.205.91:8000/msgs/del',{
				params : {
				'm_id' : this.info.mgsid 
			}, credentials : true }).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});

				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
					this.$store.dispatch({
						type : 'getownMessages'
					});
				}
			})
		},
		comment() {
			this.tocmt = !this.tocmt;
		},
		send() {
			if(this.$store.state.selfinfo.logif) {
				this.$http.get('http://139.199.205.91:8000/cmts/add', {
					params : {
						'to' : this.info.u_id,
						'm_id' : this.info.mgsid,
						'comment' : this.content
					},credentials : true
				}).then(function(res) {
					// console.log(res);
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
						this.$store.dispatch({
							type : 'getownMessages'
						});
						this.content = '';
						//评论成功
						this.tocmt = false;
						//更新评论列表
					}
				})
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '你没有登录哦','type' : 0});
				this.content = '';
			}
			
		},
		like() {
			if(this.$store.state.selfinfo.logif) {
				this.$http.get('http://139.199.205.91:8000/cmts/like', {
					params : {
						'm_id' : this.info.mgsid
					},credentials : true
				}).then(function(res) {
					// console.log(res);
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
						this.$store.dispatch({
							type : 'getownMessages'
						});
					}
				})
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '你没有登录哦','type' : 0});
			}

		},
		showshare() {
			this.toshare = !this.toshare;
		},
		share() {
			if(this.$store.state.selfinfo.logif) {
				this.$http.get('http://139.199.205.91:8000/msgs/trasmit', {
					params : {
						'm_id' : this.info.mgsid,
						'title' : this.scont
					},credentials : true
				}).then(function(res) {
					// console.log(res);
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
						this.$store.dispatch({
							type : 'getownMessages'
						});
						this.showshare();
						this.scont = '';
					}
				})
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '你没有登录哦','type' : 0});
				this.scont = '';
			}

		}
	},
	computed : {
		o_name() {
			if(this.info.type) {

			}
		}
	}
}
</script>

<style scoped>
.active {
	color: gray;
}
.hidden {
	color: white;
}

.card {
	width: 80%;
	height: auto;
	background-color: white;
	margin:3vh auto;
	border-radius: 10px;
	padding: 10px;
	border: 1px solid lightgray;
}

.card .i-up {
	width: 100%;
	height: 4.5rem;
}

.i-up .i-img {
	width: 3.6rem;
	height: 3.6rem;
	float: left;
	border-radius: 50%;
}

.i-up .i-info {
	width: 60%;
	height: 100%;
	text-align: left;
	float: left;
	line-height: 2.4rem;
	text-indent: 15px;
}

.i-up .del {
	width: auto;
	height: auto;
	font-size: 0.7rem;
	padding-left: 7%;
	float: left;
	color:gray;
}

.i-info .i-id {
	width: 100%;
	height: 50%;
	font-weight: bold;
}

.i-info .i-date {
	width: 100%;
	height: 50%;
	line-height: 1rem;
	font-size: 0.6rem;
	color: gray;
}

.card .i-down {
	width: 100%;
	height: auto;
}

.i-down .i-origin {
	width: 100%;
	margin: 0 auto;
	text-align: left;
	height: 2rem;
	color: #2575fc;
}
.i-down .i-msg {
	width: 90%;
	min-height: 3rem;
	max-height: 18rem;
	overflow: hidden;
	text-overflow: ellipsis;
	margin:0 auto;
	font-size: 0.9rem;
	text-align:left;
	line-height: 1.4rem;
	padding: 0.4rem;
}

.i-msg .showimgs {
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	justify-content:space-between;
	align-content:space-around;
}
.i-down .i-choice {
	width: 100%;
	height: 2rem;
}

.i-down .i-comment {
	width: 100%;
	height: 3rem;
	/*background-color: pink;*/
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items:center; 
	font-size: 0.9rem;
	line-height: 1.5rem;
}

.i-comment .i-content {
	width: 70%;
	height: 1.5rem;
	padding: 0.2rem;
	outline: none;
	display: block;
	border: 1px solid lightgray;
}

.i-comment .i-send {
	width: 20%;
	height: 1.5rem;
	display: block;
	color: white;
	letter-spacing: 0.2rem;
	background-color: #2575fc;
}
.i-choice .i-icon {
	width: 1.8rem;
	height: 1.8rem;
	margin-top:0.2rem;
	margin-right: 0.5rem;
	float: right;
}

</style>