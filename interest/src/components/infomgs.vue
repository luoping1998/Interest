<template>
	<div id="info-msg">
		<div class="user">
			<div class="uname">{{infor.u_name}}
				<span class="ulevel">LV{{infor.u_level}}</span>
			</div>
		</div>
		<div class="intro">{{infor.signature}}</div>
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
	height: 43%;
}
#info-msg .uname {
	width: 100%;
	height: 25%;
	text-align: center;
	font-size: 1.7rem;
}

.uname .ulevel {
	font-size: 0.2rem;
	background-color: rgb(126,180,255);
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
	height: 20%;
	color: gray;
	text-align: center;
	font-size: 1rem;
	line-height: 2.5rem;
}
</style>