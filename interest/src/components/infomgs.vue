<template>
	<div id="info-msg">
		<div class="uname">派大星</div>
		<div class="intro">我们去抓水母吧！qwq</div>
	</div>
</template>

<script>
export default {
	name: 'infomsg',
	data: function() {
		return {

		}
	}
}
</script>

<style scoped>
#info-msg {
	width: 100%;
	height: 50%;
}
#info-msg .uname {
	width: 100%;
	height: 7vh;
	text-align: center;
	font-size: 1.5rem;
}

#info-msg .intro {
	width: 70%;
	margin:0 auto;
	height: 8vh;
	color: gray;
	text-align: center;
	font-size: 1rem;
}
</style>