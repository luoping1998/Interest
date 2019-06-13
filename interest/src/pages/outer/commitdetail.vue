<template>
	<div class="commit-detail">
		<c-head />
		<busy v-if="!ok" />
		<div class="c-owner" v-show="ok">
			<div class="c-cover">
				<div class="c-head">
					<div class="c-pic" :style="note" @click.stop="showner" />
					<div class="c-info">
						<p class="c-name">{{cdata.u_name}}</p>
						<p class="c-date">{{new Date(cdata.date).Format("yyyy-MM-dd HH:mm:ss")}}</p>
					</div>
					<div class="c-reply" @click="showreply" />
				</div>
				<div class="c-cont">{{cdata.content}}</div>
				<div class="c-cont c-blue" @click="backTie">查看原帖</div>
			</div>
		</div>
		<div class="t-cover" v-if="show">
			<div class="c-tore">
				<div class="t-pic" :style="inote"></div>
				<input type="text" class="t-cont" v-model="rcont">
				<div class="t-send" @click="sendr">回复</div>
			</div>
		</div>
		
		<reply v-for="(item,index) in contents" :info="item" :key="index" :pic="arr[index]" />
	</div>
</template>

<script type="text/javascript">
import cHead from '../../components/l-head.vue';
import reply from '../../components/reply.vue';
import busy from '../../components/busy.vue'
export default {
	name : 'Commitdetail',
	data() {
		return {
			commit : [],
			pics : [],
			cdata : {},
			cpic : '',
			show : false,
			rcont :'',
			ok : false
		}
	},
	components : {
		cHead,
		reply,
		busy
	},
	computed : {
		contents () {
			return this.commit;
		},
		arr() {
			return this.pics;
		},
		note() {
			return {
				background: "url(" + this.cpic + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
		},
		cinfo() {
			return this.cdata;
		},
		inote() {
			return {
				background: "url(" + (this.$store.state.selfinfo.pic || require('../../../static/pdx.jpg')) + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
		}
	},
	created() {
		this.getCommit();
		this.getReply();
	},
	methods :{
		getCommit() {
			this.ok = false;
			this.$http.get('http://139.199.205.91:8000/cmts/getone', {params : this.$route.params,
			credentials : true}).then(function(res) {
				this.ok = true;
				if(res.body.error){
					this.$store.commit('showpop',{'popif':true,'words': res.body.result,'type' : 0});
				}else {
					this.cdata = res.body.infor;
					this.cpic = res.body.pic;
				}
			})
		},
		getReply() {
			this.ok = false;
			this.$http.get('http://139.199.205.91:8000/cmts/getdall', {params : this.$route.params,
			credentials : true}).then(function(res) {
				this.ok = true;
				if(res.body.error){
					this.$store.commit('showpop',{'popif':true,'words': res.body.result,'type' : 0});
				}else {
					this.commit = res.body.result;
					this.pics = res.body.pics;
				}
			})
		},
		backTie() {
			this.$router.push({ name : 'Msgdetails' , params : {id : this.cdata.m_id}});
		},
		showreply() {
			this.show = !this.show;
		},
		sendr() {
			this.$http.get('http://139.199.205.91:8000/cmts/reply', {
				params : {
					c_id : this.cinfo.c_id,
					r_cont :this.rcont
				},credentials :true
			}).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
					this.rcont = '';
					this.show = false;
					this.$emit('update');
				}
			})
		},
		showner() {
			let u_id = this.cdata.from_id;

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
.commit-detail {
	width: 100%;
	height: auto;
	background-color: rgb(244,244,244);
	text-align: left;
}

.commit-detail .c-owner {
	padding-top: 1.5rem;
	box-sizing: border-box;
	width: 100%;
	height: auto;
	background-color: white;
}

.commit-detail .t-cover {
	width: 100%;
	height: auto;
	background-color: white;
	padding-bottom: 1rem;
}

.t-cover .c-tore {
	width: 90%;
	margin: 0 auto;
	height: 2rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 0.8rem;
}

.c-tore .t-pic {
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 0.5rem;
	background-position: center;
	background-size: 100% auto;
}

.c-tore .t-cont {
	width: 100%;
	height: 1.5rem;
	flex: 1;
	text-indent: 0.5rem;
	outline: none;
	display: block;
	border: 1px solid lightgray;
	box-sizing: border-box;
}

.c-tore .t-send {
	line-height: 1.5rem;
	padding: 0 1rem;
	background-color:#2575fc;
	color: white;
	text-align: center;
	box-sizing: border-box;
	cursor: pointer;
}

.c-owner .c-cover {
	width: 90%;
	height: auto;
	margin: 0 auto;
}
.c-cover .c-head {
	width: 100%;
	height: 4rem;
	display: flex;
	flex-direction: row;
	align-content: center;
}

.c-head .c-pic {
	width: 3.5rem;
	height: 3.5rem;
	margin-right: 1rem;
	border-radius: 50%;
	background-position: center;
	background-size: 100% auto;
	cursor: pointer;
}

.c-head .c-info {
	width: 100%;
	height: 4rem;
	line-height: 2rem;
	flex: 1;
}

.c-head .c-reply {
	width: 2rem;
	height: 2rem;
	background:url('../../../static/icons/n-coment.png') no-repeat;
	background-position: center;
	background-size: 60% auto;
	justify-self: flex-end;
	cursor: pointer;
}

.c-info .c-name {
	font-weight: bold;
	font-size: 1.3rem;
	margin: 0;
}

.c-info .c-date {
	font-size: 0.9rem;
	color: gray;
	margin:0;
}
.c-cover .c-cont {
	width: 14rem;
	font-size: 0.9rem; 
	padding: 0 0 0.5rem 4.5rem;
}

.c-cover .c-blue {
	color: #2575fc;
	cursor: pointer;
}

</style>