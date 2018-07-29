<template>
	<div id="info-msg">
		<div class="user">
			<div class="uname">{{infor.u_name}}
				<span :class="infor.sex=='女'?'ugirl':'uboy'">{{infor.sex}}</span>
			</div>
		</div>

		<div class="intro">{{infor.signature}}</div>
		<p class="email" v-show="infor.show == 1">{{infor.email}}</p>
		<p class="email" v-show="infor.show == 0">邮箱已设置为隐藏</p>
		<scard :infor="infor"></scard>
	</div>
</template>

<script>
import scard from './partition/scard.vue'
export default {
	name: 'infomsg',
	props :['infor'],
	components :{
		scard
	}
}
</script>

<style scoped>
#info-msg {
	width: 100%;
	height: 40%;
}
#info-msg .uname {
	width: 100%;
	height: 25%;
	text-align: center;
	font-size: 1.7rem;
}

.uname .uboy {
	font-size: 0.9rem;
	background-color: rgb(126,180,255);
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}

.uname .ugirl {
	font-size: 0.9rem;
	background-color: pink;
	color: white;
	text-align: center;
	padding:0.1rem;
	margin-left: 0.3rem;
	padding-left:0.4rem;
	padding-right:0.4rem;
}

#info-msg .intro {
	width: 80%;
	margin:0 auto;
	height: auto;
	max-height: 4rem;
	color: gray;
	text-align: center;
	font-size: 1rem;
	line-height: 2.5rem;
}

#info-msg .email {
	width: 80%;
	margin:0 auto;
	margin-bottom: 1rem;
	font-size: 0.9rem;
	color: gray;	
}
</style>