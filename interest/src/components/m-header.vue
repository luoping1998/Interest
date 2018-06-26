<template>
	<div class="m-header">
		<img :src="psrc" id="prom" @click="showproms">
		<img id="icon" :src="src" @click="change" />
		<div class="pop" v-show="show" @click.stop = "change">
			<div class="p-body">
				<div class="trangle"></div>
				<div class="switch" @click.stop>
					<s-case words="添加好友" icon="../../../static/myself/add.png" @click.native="add"></s-case>
					<s-case words="修改资料" icon="../../../static/myself/change.png" @click.native="chaninfo"></s-case>
					<s-case words="退出" icon="../../../static/myself/out.png" @click.native="getout"></s-case>
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
			src : '../../../static/myself/n-chan.png',
			show : false,
			psrc : '../../../static/myself/prom.png',
			hasnew :this.$store.state.selfinfo.prompts.hasnew
		}
	},
	methods : {
		change() {
			this.show = !this.show;
		},
		getout() {
			this.$http.get('http://localhost:8000/users/out',{params : '',credentials : true}).then(function(res) {
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
		}
	},
	components : {
		sCase
	},
	watch : {
		hasnew : (nhas, ohas) => {
			if(nhas == true) {
				this.shake();
			}
		}
	},
	mounted() {
		if(this.hasnew) {
			console.log('shale.');
			this.shake();
		}
		console.log(this.hasnew);
	}
}
</script>

<style scoped>
.m-header {
	width: 100%;
	min-height: 7.5%;
	overflow: hidden;
}

.m-header #icon {
	width: 1.5rem;
	height: 1.3rem;
	margin: 0.7rem;
	float: right;
	border:none;
}

.m-header #prom {
	width: 1.8rem;
	height: 1.5rem;
	margin: 0.7rem;
	float: left;
	border:none;
}

.m-header .pop {
	width: 100%;
	height: 100vh;
	z-index: 5;
	background-color: rgba(0,0,0,0.3);
	position: absolute;
}

.pop .p-body {
	width: 30vw;
	height: 20vh;
	position:absolute;
	right: 0.5rem;
	top:2rem;
}

.p-body .trangle {
	width: 0;
	height: 0;
	border-width: 0.5rem;
	border-style: solid;
	border-color: transparent transparent white transparent;
	position: relative;
	left: 75%;
}

.p-body .switch {
	width: 100%;
	height: 80%;
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