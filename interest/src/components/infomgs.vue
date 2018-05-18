<template>
	<div id="info-msg">
		<div class="user">
			<div class="uname">{{infor.u_name}}</div>
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
	height: 7vh;
	text-align: center;
	font-size: 1.7rem;
}

#info-msg .intro {
	width: 80%;
	margin:0 auto;
	height: 8vh;
	color: gray;
	text-align: center;
	font-size: 1rem;
}
</style>