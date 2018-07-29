<template>
	<div id="msg-details">
		<d-head></d-head>
		<busy v-show="!ok"></busy>
		<div v-show="ok" class="de-cover">
			<div class="de-top">
				<div class="de-pic" :style="note" @click.stop="showner"></div>
				<div class="de-info">
					<div class="de-name">{{msginfo.u_name}}</div>
					<div class="de-date">{{new Date(msginfo.date).Format("yyyy-MM-dd HH:mm:ss")}}</div>
				</div>
			</div>
			<div class="de-origin" v-if="msginfo.type">转发自 {{msginfo.o_name}} :</div>
			<div class="de-content">{{msginfo.content}}</div>
			<!--以后放图片-->
			<div class="de-content-pic">
				<img v-for="item in imgs" :src="item">
			</div>
			<div class="de-actions">
				<div class="de-switch">喜欢{{msginfo.Lnum}}</div>
				<div class="de-switch">评论{{msginfo.Cnum}}</div>
				<div class="de-switch" style="border:none;">分享{{msginfo.Snum}}</div>
			</div>
			<div class="de-do-comment">
				<div class="comment-pic" :style="cmtpic"></div>
				<input type="text" class="comment-content" v-model="comment" placeholder="评论一条试试吧">
				<div class="de-send" @click="send">发表</div>
			</div>
			<div class="comment-body">
				<div class="new-or-hot">
					<div class="btn" @click="byhot">按热度</div>
					<div class="btn" @click="bydate">按时间</div>
				</div>
			</div>
			<div class="no-comment" v-if="!clist.length">
				<div class="pic"></div>
				<div class="words">暂时还没有人评论呢</div>	
			</div>
			<comment v-for="(item,index) in clist" :info="item" :key="item.id" :pic="pics[index]" @update="updcmts">
			</comment>
		</div>
	</div>
</template>

<script>
import comment from '../../components/commit.vue'
import busy from '../../components/busy.vue'
import dHead from '../../components/l-head.vue'
export default {
	name :'msg-details',
	created() {
		this.updcmts();
	},
	data() {
		return {
			'msginfo' : {},
			'note' : {},
			'cmtpic' : {
				background: "url(" + (this.$store.state.selfinfo.pic || require('../../../static/pdx.jpg')) + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto"
			},
			'comment' : '',
			'clist' : [],
			'pics' : [],
			'imgs' :[],
			'type' : 1 ,			//默认按,
			'ok' : false
		}
	},
	components : {
		comment,
		busy,
		dHead
	},
	methods : {
		showner() {
			let u_id = this.msginfo.u_id;
			if(this.$store.state.selfinfo.logif){
				if(u_id === JSON.parse(sessionStorage.getItem('user')).id) {
					this.$router.push('/index/myself');
				}else{
					this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
				}
			}else {
				this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
			}

			
		},
		goback() {
			this.$router.go(-1);
		},
		send() {
			if(this.$store.state.selfinfo.logif) {
				this.ok = false;
				this.$http.get('http://139.199.205.91:8000/cmts/add', {
					params : {
						'from' : JSON.parse(sessionStorage.getItem('user')).id,
						'to' : this.msginfo.u_id,
						'm_id' : this.msginfo.mgsid,
						'comment' : this.comment
					},
					credentials : true,
					_timeout : 5000
				}).then(function(res) {
					this.ok = true;
					if(res.body.error) {
						this.$store.commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 1});
						this.comment = '';
						this.updcmts();
					}
				})
			}else {
				this.$store.commit("showpop",{'popif' : true,'words' : '你没有登录哦','type' : 0});
				this.comment = '';
			}
			
		},
		updcmts() {
			this.ok = false;
			this.$http.get('http://139.199.205.91:8000/msgs/details', {
				params : {
					'id' : this.$route.params.id,
					'type' : this.type
				}, 
				credentials : true,
				_timeout :5000
			}).then(function(res) {
				this.ok = true;
				if(res.body.error) {
					this.$store.commit("showpop",{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.msginfo = res.body.result[0];
					this.note = {
						background: "url(" + res.body.pic + ") no-repeat",
	            		backgroundPosition: "center",
	            		backgroundSize: "100% auto"
	            	};
	            	this.clist = res.body.comments.result;
	            	this.pics = res.body.comments.pics;
	            	this.imgs = res.body.imgs;
				}
			},function(err) {
				this.$store.commit("showpop",{'popif' : true,'words' : '请求超时，请重试','type' : 0});
			})
		},
		bydate() {
			this.type = 0;
			this.updcmts();
		},
		byhot() {
			this.type = 1;
			this.updcmts();
		}
	}
}
</script>

<style>
#msg-details {
	width: 100%;
	margin: 0 auto;
	height: auto;
	padding-bottom: 1rem;
	text-align: left;
}

#msg-details .de-cover {
	padding-top: 4rem;
	width: 100%;
	height: auto;
}
.de-cover .de-top {
	width: 90%;
	height: 4rem;
	margin: 0 auto;
}

.de-top .de-pic {
	width: 4rem;
	height: 4rem;
	border-radius: 90%;
	background-color: rgb(126,177,245);
	margin-left: 1rem;
	float: left;
}

.de-top .de-info {
	width: 60%;
	height: 100%;
	float: left;
	margin-left: 0.2rem;
	text-indent: 0.6rem;
}

.de-info .de-name {
	width: 100%;
	height: 60%;
	font-size: 1.7rem;
	line-height: 2.5rem;
}

.de-info .de-date {
	width: 100%;
	height: 40%;
	color: gray;
	font-size: 0.8rem;
	line-height: 1.8rem;
}

.de-cover .de-origin {
	width: 85%;
	margin:0 auto;
	font-size: 0.8rem;
	margin-top: 0.5rem;
	color: #2575fc;
	height: 1.6rem;
	/*border-bottom: 1px solid lightgray;*/
}

.de-cover .de-content {
	width: 75%;
	margin: 0.6rem auto 0 auto;
	padding:1rem;
	padding-top:0;
	padding-bottom:0.6rem;
	/*margin-top: 1rem;*/
	height: auto;
	max-height: 10rem;
}

.de-cover .de-imgs {
	width: 85%;
	margin: 0 auto;
	height: auto;
}

.de-cover .de-content-pic {
	width: 75%;
	margin: 0 auto;
	height: auto;
}

.de-content-pic img {
	width: 100%;
	margin-bottom: 0.5rem;
}
.de-cover .de-actions {
	width: 88%;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	border: 1px solid lightgray;
}

.de-actions .de-switch{
	width: 33%;
	height: 1.3rem;
	text-align: center;
	font-size: 0.8rem;
	line-height: 1.5rem;
	border-right: 1px solid lightgray;
	letter-spacing: 0.2rem;
	line-height: 1.3rem;
}

.de-cover .de-do-comment {
	width: 90%;
	padding:1rem;
	height: auto;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items:center;
}

.de-do-comment .comment-pic {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 90%;
	background-color: rgb(126,177,245);
}

.de-do-comment .comment-content {
	padding:0.3rem;
	width: 55%;
	height: 50%;
	display: block;
	font-size: 0.8rem;
	outline: none;
}

.de-do-comment .de-send {
	width: 18%;
	height: 1.8rem;
	background-color: #2575fc;
	text-align: center;
	font-size: 0.9rem;
	line-height: 1.8rem;
	letter-spacing: 0.2rem;
	color: white;
}

.de-cover .comment-body {
	width: 90%;
	border-top: 1px solid lightgray;
	padding: 0.7rem;
	padding-right: 0;
	padding-left: 0;
	height: auto;
	margin: 0 auto;
}

.comment-body .new-or-hot {
	width: 45%;
	height: 1rem;
	line-height: 1rem;
	text-align: center;
	font-size: 0.8rem;
}

.new-or-hot .btn {
	width: 49%;
	height: 100%;
	float: left;
}

.no-comment {
	width: 80%;
	height: 5rem;
	padding:0.5rem;
	margin: 0 auto;
	margin-top: 1rem;
	line-height: 5rem;
	font-size: 1rem;
	font-size: 0.9rem;
	text-align: left;
	border-bottom: 1px solid gray;
}

.no-comment .words {
	width: 60%;
	height: 100%;
	float: left;
}

.no-comment .pic {
	width: 40%;
	height: 100%;
	background:url('../../../static/timg.png') no-repeat;
	background-position: center;
	float: left;
	background-size: auto 80%;
}
</style>