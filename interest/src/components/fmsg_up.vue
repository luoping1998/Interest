<template>
	<div id="fupper">
		<div class="info-img">
			<div class="info-pic" :style="inote"></div>
		</div>
		<div class="icon" @click="back" />
	</div>
</template>

<script>

export default {
	name: 'upper',
	props: ['infosrc','bgsrc'],
	computed : {
		inote() {
			return {
				background: "url(" + this.infosrc + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
		}
	},
	methods :{
		back() {
			this.$router.back(-1);
		}
	}
}
</script>

<style scoped>
#fupper {
	width: 100%;
	height: 15rem;
	background: url("../../static/zsm.jpg") no-repeat;
  background-size: 100% auto;
	position: relative;
}

#fupper .info-img {
	width: 100%;
	height: 2rem;
	position: absolute;
	background-color: white;
	bottom: -1px;
}

#fupper .info-pic {
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top: -3rem;
	background-position: center;
	background-size: 100% auto;
	border-bottom: 2px solid lightgray;
}

#fupper .icon {
	width: 2.5rem;
	height: 2.5rem;
	background:url('../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 80% auto;
	cursor: pointer;
}
</style>