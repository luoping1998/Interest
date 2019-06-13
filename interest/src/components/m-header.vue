<template>
	<div class="m-header">
		<div class = "prompt">
			<img :src="(hasnew ? asrc : nsrc)" id="prom" @click="showproms">
			<div class="alarm" v-show="hasnew"></div>
		</div>
		<img id="icon" src="../../static/myself/n-chan.png" @click="change" />
		<div class="pop" v-show="show" @click.stop = "change">
			<div class="p-body">
				<div class="trangle"></div>
				<div class="switch" @click.stop>
					<s-case words="添加好友" :icon="aicon" @click.native="add" />
					<s-case words="修改资料" :icon="xicon" @click.native="chaninfo" />
					<s-case words="修改密码" :icon="cicon" @click.native="cpass" />
					<s-case words="退出" :icon="qicon" @click.native="getout" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import sCase from './partition/case.vue'
export default {
	name : 'mHeader',
	data : function (){
		return {
			show : false,
			nsrc : require('../../static/myself/n-prom.png'),
			asrc : require('../../static/myself/a-prom.png'),
			aicon : require("../../static/myself/add.png"),
			xicon : require("../../static/myself/change.png"),
			qicon : require("../../static/myself/out.png"),
			cicon : require('../../static/myself/cpass.png')
		}
	},
	computed : {
		hasnew () {
			return this.$store.state.selfinfo.prompts.hasnew;
		}
	},
	methods : {
		change() {
			this.show = !this.show;
		},
		cpass() {
			this.$router.push('/fpass');
		},
		getout() {
			this.$http.get('http://139.199.205.91:8000/users/out',{params : '',credentials : true}).then(function(res) {
				if(res.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'poptype' : 0});
				}else {
					this.$store.commit('logf');
					sessionStorage.clear();
					this.$router.push('/');
				}
			})
			this.show = false;
		},
		chaninfo() {
			this.$router.push('/chinfo');
		},
		add() {
			this.$router.push('/add');
		},
		shake() {
			document.getElementById('prom').className = 'swing';
		},
		showproms () {
			this.$router.push('/proms');
			this.$store.dispatch({
				type : 'readprompts'
			});
		}
	},
	components : {
		sCase
	},
	watch : {
		hasnew : function(nhas, ohas) {
			if(nhas == true) {
				this.shake();
			}
		}
	},
	mounted() {
		if(this.hasnew) {
			this.shake();
		}
	}
}
</script>

<style scoped>
.m-header {
	width: 100%;
	height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.m-header #icon {
	width: 1.3rem;
	height: 1.2rem;
	padding-right: 1rem;
	cursor: pointer;
}

.m-header .prompt {
	width: 4rem;
	height: 3rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.prompt #prom {
	width: 1.8rem;
	height: 1.5rem;
	cursor: pointer;
}

.prompt .alarm {
	width: 0.5rem;
	height: 0.5rem;
	background-color: red;
	border-radius:50%;
}

.pop {
	width: 100%;
	height: 100vh;
	z-index: 5;
	background-color: rgba(0,0,0,0.3);
	position: absolute;
	top: 0;
	left: 0;
}

.pop .p-body {
	width: 8rem;
	height: 9.5rem;
	right: 0.5rem;
	top:2rem;
	position: absolute;
}

.p-body .trangle {
	width: 0;
	height: 0;
	border-width: 0.5rem;
	border-style: solid;
	border-color: transparent transparent white transparent;
	position: relative;
	left: 80%;
}

.p-body .switch {
	width: 100%;
	height:100%;
	background-color: white;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
} 

@-webkit-keyframes swing{
	20% {
		-webkit-transform:rotate(15deg);
		transform:rotate(15deg)
	} 40% { 
		-webkit-transform:rotate(-10deg);
		transform:rotate(-10deg)
	} 60% {
		-webkit-transform:rotate(5deg);
		transform:rotate(5deg)
	} 80% {
		-webkit-transform:rotate(-5deg);
		transform:rotate(-5deg)
	} to {
		-webkit-transform:rotate(0deg);
		transform:rotate(0deg)
	}
}

@keyframes swing { 
	20% {
		-webkit-transform:rotate(15deg);
		transform:rotate(15deg)
	} 40% { 
		-webkit-transform:rotate(-10deg);
		transform:rotate(-10deg)
	} 60% {
		-webkit-transform:rotate(5deg);
		transform:rotate(5deg)
	} 80% {
		-webkit-transform:rotate(-5deg);
		transform:rotate(-5deg)
	} to {
		-webkit-transform:rotate(0deg);
		transform:rotate(0deg)
	}
}

.swing {
	-webkit-transform-origin:top center;
	transform-origin:top center;
	-moz-animation:swing 2s; /* Firefox */
	-webkit-animation:swing 2s; /* Safari and Chrome */
	-o-animation:swing 2s; /* Opera */
}
</style>