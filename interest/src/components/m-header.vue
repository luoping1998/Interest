<template>
	<div class="m-header">
		<img class="icon" :src="src" @click="change" />
		<div class="pop" v-show="show" @click.stop = "change">
			<div class="p-body">
				<div class="trangle"></div>
				<div class="switch" @click.stop>
					<s-case height="32%" words="添加好友" icon="../../../static/add.png" @click.native="add"></s-case>
					<s-case height="32%" words="修改资料" icon="../../../static/change.png" @click.native="chaninfo"></s-case>
					<s-case height="32%" words="退出" icon="../../../static/out.png" @click.native="getout"></s-case>
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
			src:'../../../static/n-chan.png',
			show : false
		}
	},
	methods : {
		change() {
			this.show = !this.show;
		},
		getout() {
			console.log('out');
			this.$http.post('http://localhost:8000/users/out',{},{emulateJSON : true,withCredentials: true}).then(function(res) {
				if(res.error) {
					//
				}else {
					sessionStorage.clear();
					this.$router.push('/');
				}
			})
			this.show = false;
		},
		chaninfo() {
			// console.log(this.$router);
			this.$router.push('/chinfo');
		},
		add() {
			this.$router.push('/add');
		}
	},
	components : {
		sCase
	}
}
</script>

<style scoped>
.m-header {
	width: 100%;
	min-height: 7.5vh;
}

.m-header .icon {
	width: 1.8rem;
	height: 1.5rem;
	margin: 0.7rem;
	float: right;
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
	border-width: 2vw;
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
	/*display: table;*/
} 
/*
.switch .case {
	width: 100%;
	height: 30%;
	text-align: center;
	background-color: pink;
}*/

</style>