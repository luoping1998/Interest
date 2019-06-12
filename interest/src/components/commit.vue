<template>
	<div class="commit">
		<div class="co-up">
			<div class="co-pic" :style="note" @click.stop="showmore"></div>
			<div class="co-info">
				<div class="co-name">{{info.u_name}}</div>
				<div class="co-date">{{new Date(info.date).Format("yyyy-MM-dd HH:mm:ss")}}</div>
				<div class="co-content">{{info.content}}
					<div class="co-back" @click="showif"></div>
				</div>
			</div>
		</div>
		<div class="co-reply" v-show="replyif">
			<div class="r-pic" :style="inote" ></div>
			<input type="text" class="r-cont" v-model="rwords" placeholder="你有什么想对他说的吗">
			<div class="r-send" @click.stop="reply">回 复</div>
		</div>
		<div class="co-count" v-if="info.reply" @click.stop="showreply">
			<span class="special">共{{info.reply}}人回复</span>
		</div>
	</div>
</template>

<script>
export default {
	name : 'commit' ,
	props : ['info','pic'],
	computed : {
		note () {
			return {
				background: "url(" + this.pic + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
		},
		inote () {
			return {
				background: "url(" + (this.$store.state.selfinfo.pic || require('../../static/pdx.jpg')) + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
		}
	},
	data() {
		return {
			rwords : '',
			replyif : false
		}
	},
	methods : {
		showif() {
			this.replyif = !this.replyif;
		},
		reply() {
			this.$http.get('http://139.199.205.91:8000/cmts/reply', {
				params : {
					c_id : this.info.c_id,
					r_cont :this.rwords
				},credentials :true
			}).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
					this.rwords = '';
					this.replyif = false;
					this.$emit('update');
				}
			})
		},
		showreply() {
			this.$router.push({'name' : 'Commitdetail', params : { c_id : this.info.c_id}})
		},
		showmore() {
			let u_id = this.info.from_id;
			if(this.$store.state.selfinfo.logif){
				if(u_id === JSON.parse(sessionStorage.getItem('user')).id) {
					this.$router.push('/index/myself');
				}else{
					this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
				}
			}else {
				this.$router.push({ name : 'Frinfo' , params : {id : u_id}});
			}
			
		}
	}
}
</script>

<style scoped>

.special {
	color:#2575fc;
}

.commit {
	width: 90%;
	height: auto;
	padding:0.6rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
}

.commit .co-up {
	width: 100%;
	height: auto;
	display: flex;
	justify-content: row;
}

.co-up .co-pic {
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	cursor: pointer;
}

.co-up .co-info {
	width: 100%;
	flex: 1;
	padding-bottom: 0;
	height: auto;
	margin-left: 1rem;
}

.co-info .co-name {
	width: 100%;
	height: 2rem;
	text-indent: 0.3rem;
	font-size: 1.2rem;
	line-height: 2rem;
}

.co-info .co-date {
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	color: gray;
	font-size: 0.8rem;
}

.co-info .co-content {
	width: 100%;
	height: auto;
	float: left;
	line-height: 1.6rem;
	font-size: 0.8rem;
	position: relative;
}

.co-content .co-back {
	width: 1rem;
	height: 1rem;
	position: absolute;
	bottom: 0;
	right: 0;
	background:url('../../static/icons/n-coment.png') no-repeat;
	background-position: center;
	background-size: 100% auto;
	cursor: pointer;
} 

.commit .co-reply {
	width: 100%;
	height: 2.5rem;
	display: flex;
	padding-left: 4rem;
	margin-top: 0.5rem;

	flex-direction: row;
	align-items: center;
	box-sizing: border-box;
}

.co-reply .r-pic {
	width: 2.5rem;
	height: 2.5rem;
}

.co-reply .r-cont {
	width: 100%;
	height: 1.6rem;
	flex: 1;
	outline: none;
	border: 1px solid lightgray;
	padding: 0.2rem;
	padding-left: 0.4rem;
	padding-right: 0.4rem;
	font-size: 0.8rem;
	line-height: 1.6rem;
	display: block;
	box-sizing: border-box;
}

.co-reply .r-send{
	width: 3rem;
	height: 1.6rem;
	background: #2575fc;
	color: white;
	text-align: center;
	font-size: 0.8rem;
	line-height: 1.6rem;
	cursor: pointer;
}

.commit .co-count {
	width: 100%;
	height: 1.5rem;
	margin-top: 0.5rem;
	background: rgba(0,0,0,0.1);
	font-size: 0.8rem;
	text-indent: 2rem;
	line-height: 1.5rem;
	color: black;
}
</style>