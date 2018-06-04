<template>
	<div class="card" @click.stop="showdetails">
		<div class="i-up">
			<div class="i-img" :style="note"></div>
			<div class="i-info">
				<div class="i-id">{{info.u_name}}</div>
				<div class="i-date">{{info.date}}</div>
			</div>
			<div v-show="show" class="del" @click.stop="todel">删除</div>
		</div>
		<div class="i-down">
			<div class="i-msg">
				{{info.content}}
			</div>
			<div class="i-choice" @click.stop>
				<i-con :nsrc="nShare" :asrc="aShare"></i-con>
				<i-con :nsrc="nComent" :asrc="aComent" @click.native="comment"></i-con>
				<i-con :nsrc="nLike" :asrc="aLike"></i-con>
			</div>
			<div class="i-comment" @click.stop v-show="tocmt">
				<input type="text" class="i-content" v-model="content">
				<div class="i-send" @click="send">发表</div>
			</div>
		</div>
	</div>
</template>

<script>
import {bus} from '../../static/js/bus.js'
import iCon from './partition/i-like.vue'
export default {
	name : 'card',
	components:{
		iCon
	},
	props:['imgsrc','info','show'],
	data: function() {
		return {
			nLike : '../../../static/icons/n-like.png',
			aLike : '../../../static/icons/a-like.png',
			nShare : '../../../static/icons/n-share.png',
			aShare : '../../../static/icons/a-share.png',
			nComent :'../../../static/icons/n-coment.png',
			aComent :'../../../static/icons/a-coment.png',
			note : {
				backgroundImage: "url(" + this.imgsrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto",
            	backgroundPosition: "center"
			},
			tocmt : false,
			content : ''
		}
	},
	methods : {
		showdetails() {
			this.$router.push({ name : 'Msgdetails' , params : {id : this.info.mgsid}});
		},
		todel() {
			this.$http.get('http://localhost:8000/msgs/del',{
				params : {
				'm_id' : this.info.mgsid 
			}, credentials : true }).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 1});
					this.$emit('toupd');
				}
			})
		},
		comment() {
			this.tocmt = !this.tocmt;
		},
		send() {
			this.$http.get('http://localhost:8000/cmts/add', {
				params : {
					'from' : JSON.parse(sessionStorage.getItem('user')).id,
					'to' : this.info.u_id,
					'm_id' : this.info.mgsid,
					'comment' : this.content
				},credentials : true
			}).then(function(res) {
				// console.log(res);
				if(res.body.error) {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 0});
				}else {
					bus.$emit('pop',{'popif' : true,'popwords' : res.body.result,'poptype' : 1});
					this.comment = '';
					//评论成功
					this.tocmt = false;
					//更新评论列表
				}
			})
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
	width: 4rem;
	height: 4rem;
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

.i-down .i-msg {
	width: 90%;
	height: 4rem;
	margin:0 auto;
	border: 1px solid lightgray;
	font-size: 0.9rem;
	text-align:left;
	line-height: 1.4rem;
	padding: 0.4rem;
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
	background-color: rgb(126,177,245);
}
.i-choice .i-icon {
	width: 1.8rem;
	height: 1.8rem;
	margin-top:0.2rem;
	margin-right: 0.5rem;
	float: right;
}

</style>