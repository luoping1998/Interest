<template>
	<div id="msg-details">
		<div class="de-head">
			<div class="return" @click="goback"></div>
		</div>
		<div class="de-top">
			<div class="de-pic" :style="note"></div>
			<div class="de-info">
				<div class="de-name">{{msginfo.u_name}}</div>
				<div class="de-date">{{msginfo.date}}</div>
			</div>
		</div>
		<div class="de-content">{{msginfo.content}}</div>
		<!--以后放图片-->
		<div class="de-content-pic"></div>
		<div class="de-actions">
			<div class="de-switch">喜欢{{msginfo.Lnum}}</div>
			<div class="de-switch">评论{{msginfo.Cnum}}</div>
			<div class="de-switch" style="border:none;">分享{{msginfo.Snum}}</div>
		</div>
		<div class="de-do-comment">
			<div class="comment-pic" :style="cmtpic"></div>
			<input type="text" class="comment-content" v-model="comment">
			<div class="de-send" @click="send">发表</div>
		</div>
		<div class="comment-body">
			<div class="new-or-hot">
				<div class="btn" style="border-right:1px solid lightgray;">按热度</div>
				<div class="btn">按时间</div>
			</div>
		</div>
		<div class="no-comment" v-if="!clist.length">
			<div class="pic"></div>
			<div class="words">暂时还没有人评论呢</div>	
		</div>
		<comment v-for="item in clist" :info="item"></comment>
		
	</div>
</template>

<script>
import {bus} from '../../../static/js/bus.js'
import comment from '../../components/commit.vue'
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
				background: "url(" + ( sessionStorage.getItem('pic') || '../../../static/pdx.jpg' ) + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto"
			},
			'comment' : '',
			'clist' : []
		}
	},
	components : {
		comment
	},
	methods : {
		goback() {
			this.$router.go(-1);
		},
		send() {
			this.$http.get('http://localhost:8000/cmts/add', {
				params : {
					'from' : JSON.parse(sessionStorage.getItem('user')).id,
					'to' : this.msginfo.u_id,
					'm_id' : this.msginfo.mgsid,
					'comment' : this.comment
				},credentials : true
			}).then(function(res) {
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 1});
					this.comment = '';
					this.updcmts();
				}
			})
		},
		updcmts() {
			this.$http.get('http://localhost:8000/msgs/details', {
				params : this.$route.params, credentials : true
			}).then(function(res) {
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					this.msginfo = res.body.result[0];
					this.note = {
						background: "url(" + res.body.pic + ") no-repeat",
	            		backgroundPosition: "center",
	            		backgroundSize: "100% auto"
	            	};
	            	this.clist = res.body.comments.result;
				}
			})
		}
	}
}
</script>

<style scoped>
#msg-details {
	width: 100%;
	margin: 0 auto;
	height: auto;
	text-align: left;
}

#msg-details .de-head {
	width: 100%;
	height: 2.8rem;
	/* background-color: rgba(126,177,245); */
    background-image: -webkit-linear-gradient(30deg, #7eb1f5 0%, #2575fc 100%);
    background-image: -o-linear-gradient(30deg, #7eb1f5 0%, #2575fc 100%);
    background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
	margin-bottom: 1rem;	
}

.de-head .return {
	width: 2.8rem;
	height: 2.8rem;
	background:url('../../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 60% auto;
}
#msg-details .de-top {
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

#msg-details .de-content {
	width: 75%;
	margin: 0 auto;
	padding:1rem;
	padding-top:0.5rem;
	padding-bottom:1rem;
	margin-top: 1rem;
	height: auto;
	max-height: 10rem;
}
#msg-details .de-content-pic {
	width: 75%;
	margin: 0 auto;
	height: auto;
}
#msg-details .de-actions {
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

#msg-details .de-do-comment {
	width: 90%;
	height: 2.5rem;
	padding:1rem;
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

#msg-details .comment-body {
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