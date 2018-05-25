<template>
	<div id="upper" :style="note">
		<div class="info-img">
			<img :src="infosrc"/>
		</div>
		<div class="icon" @click="$router.go(-1)"></div>
	</div>
</template>

<script>
export default {
	name: 'upper',
	props: ['infosrc','bgsrc'],
	data:  function() {
		return {
			note:{
				backgroundImage: "url(" + this.bgsrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto"
			}
		}
	}
}
</script>

<style scoped>
#upper {
	width: 100%;
	height: 55%;
	position: relative;
}

#upper .info-img {
	width:100%;
	height: 8vh;
	position: absolute;
	bottom: 0;
	background-color: white;
}

#upper img {
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-10vh;
	border-bottom: 2px solid lightgray;
}

#upper .icon {
	width: 2.5rem;
	height: 2.5rem;
	background:url('../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 80% auto;
}
</style>