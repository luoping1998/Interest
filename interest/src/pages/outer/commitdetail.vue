<template>
	<div class="commit-detail">
		<c-head ></c-head>
		<div class="c-owner">
			<div class="c-cover">
				<div class="c-head">
					<div class="c-pic" :style="note"></div>
					<div class="c-info">
						<p class="c-name">{{cdata.u_name}}</p>
						<p class="c-date">{{new Date(cdata.date).Format("yyyy-MM-dd HH:mm:ss")}}</p>
					</div>
					<div class="c-reply" @click="showreply"></div>

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
		
		<reply v-for="(item,index) in contents" :info="item" :key="index" :pic="arr[index]"></reply>
	</div>
</template>

<script type="text/javascript">
import cHead from '../../components/l-head.vue';
import reply from '../../components/reply.vue';
export default {
	name : 'Commitdetail',
	data() {
		return {
			commit : [],
			pics : [],
			cdata : {},
			cpic : '',
			show : false,
			rcont :''
		}
	},
	components : {
		cHead,
		reply
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
				background : 'url(' + this.cpic +") no-repeat",
				backgroundSize : '100% auto',
				backgroundPosition : 'center'
			}
		},
		cinfo() {
			return this.cdata;
		},
		inote() {
			return {
				background : 'url(' + (this.$store.state.selfinfo.pic || '../../../static/pdx.jpg')+") no-repeat",
				backgroundSize : '100% auto',
				backgroundPosition : 'center'
			}
		}
	},
	created() {
		this.getCommit();
		this.getReply();
	},
	methods :{
		getCommit() {
			this.$http.get('http://139.199.205.91:8000/cmts/getone', {params : this.$route.params,
			credentials : true}).then(function(res) {
				if(res.body.error){
					this.$store.commit('showpop',{'popif':true,'words': res.body.result,'type' : 0});
				}else {
					// console.log(res.body);
					this.cdata = res.body.infor;
					this.cpic = res.body.pic;
					// console.log(this.cdata ,this.cpic);
				}
			})
		},
		getReply() {
			this.$http.get('http://139.199.205.91:8000/cmts/getdall', {params : this.$route.params,
			credentials : true}).then(function(res) {
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
		}
	}
}
</script>

<style scoped>
.commit-detail {
	width: 100%;
	height: auto;
	margin-top: 3rem;
	background-color: rgb(244,244,244);
	text-align: left;
}

.commit-detail .c-owner {
	padding-top: 1.5rem;
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
}

.c-tore .t-pic {
	width: 2rem;
	height: 2rem;
	float: left;
	margin-right: 1rem;
}

.c-tore .t-cont {
	width: 13rem;
	height: 1.5rem;
	outline: none;
	display: block;
	margin-right:1rem;
	float: left;
	margin-top: 0.2rem;
	text-indent: 0.5rem;
	border: 1px solid lightgray;
}

.c-tore .t-send {
	width: 3rem;
	height: 1.5rem;
	background-color:#2575fc;
	margin-top: 0.25rem;
	float: left;
	color: white;
	font-size: 0.8rem;
	text-align: center;
	line-height: 1.5rem;
	letter-spacing: 0.2rem;
}
.c-owner .c-cover {
	width: 90%;
	height: auto;
	margin: 0 auto;
}
.c-cover .c-head {
	width: 100%;
	height: 4rem;
}

.c-head .c-pic {
	width: 3.5rem;
	height: 3.5rem;
	float:left;
	margin-right: 1rem;
	border-radius: 50%;
}

.c-head .c-info {
	width: 10rem;
	height: 4rem;
	float: left;
	line-height: 2rem;
}

.c-head .c-reply {
	width: 2rem;
	height: 2rem;
	float: right;
	background:url('../../../static/icons/n-coment.png') no-repeat;
	background-position: center;
	background-size: 60% auto;
}

.c-info .c-name {
	font-weight: bold;
	font-size: 1.3rem;
}
.c-name .c-reply {
	width: 4rem;
	height: 100%;
	float: right;
	background-color: pink;
}
.c-info .c-date {
	font-size: 0.9rem;
	color: gray;
}
.c-cover .c-cont {
	width: 14rem;
	height: auto;
	padding-bottom: 1rem;
	font-size: 0.9rem;
	margin-left: 4.5rem;
}

.c-cover .c-blue {
	color: #2575fc;
}

</style>