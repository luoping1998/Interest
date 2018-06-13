<template>
	<div class="commit">
		<div class="co-up">
			<div class="co-pic" :style="note"></div>
			<div class="co-info">
				<div class="co-name">{{info.u_name}}</div>
				<div class="co-date">{{new Date(info.date).Format("yyyy-MM-dd HH:mm:ss")}}</div>
				<div class="co-content">{{info.content}}
					<div class="co-back" @click="showif"></div>
				</div>
			</div>
		</div>
		<div class="co-reply" v-show="replyif">
			<div class="r-pic" :style="note" ></div>
			<input type="text" class="r-cont" v-model="rwords" placeholder="你有什么想对他说的吗">
			<div class="r-send" @click.stop="reply">回 复</div>
		</div>
		<div class="co-count" v-if="info.reply"><span class="special">{{}}</span> 等人 <span class="special">共{{info.reply}}人回复</span></div>
	</div>
</template>

<script>
export default {
	name : 'commit' ,
	props : ['info','pic'],
	computed : {
		note () {
			return {
				'background' : 'url('+this.pic +') no-repeat',
				'backgroundPosition' : 'center',
				'backgroundSize' : '100% auto'
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
			// console.log(this.info);
			this.$http.get('http://localhost:8000/cmts/reply', {
				params : {
					c_id : this.info.c_id,
					r_cont :this.rwords
				},credentials :true
			}).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
				}
			})
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
	width:3rem;
	height: 3rem;
	/*background-color: pink;*/
}

.co-up .co-info {
	width: 78%;
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
	width:90%;
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
	bottom: 0rem;
	right: -1rem;
	background:url('../../static/icons/n-coment.png') no-repeat;
	background-position: center;
	background-size: 100% auto;
} 

.commit .co-reply {
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.co-reply .r-pic {
	width: 2rem;
	height: 2rem;
}

.co-reply .r-cont {
	width: 60%;
	height: 1.6rem;
	outline: none;
	border: 1px solid lightgray;
	padding: 0.2rem;
	padding-left: 0.4rem;
	padding-right: 0.4rem;
	font-size: 0.8rem;
	line-height: 1.6rem;
	display: block;
}

.co-reply .r-send{
	width: 3rem;
	height: 1.6rem;
	background: #2575fc;
	color: white;
	text-align: center;
	font-size: 0.8rem;
	line-height: 1.6rem;
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