<template>
	<div id="upper" :style="note">
		<div class="info-img">
			<div class="info-pic" :style="inote"></div>
		</div>
		<div class="icon" @click="back"></div>
	</div>
</template>

<script>
export default {
	name: 'upper',
	props: ['infosrc','bgsrc'],
	computed : {
		note() {
			return{
				background: "url(" + this.bgsrc + ") no-repeat",
            	backgroundSize: "100% auto"
			}
		},
		inote() {
			return {
				background: "url(" + this.infosrc + ") no-repeat",
				backgroundColor : 'white',
				backgroundSize: "100% auto", 
            	backgroundPosition : "center"
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
#upper {
	width: 100%;
	height: 55%;
	position: relative;
}

#upper .info-img {
	width:100%;
	height: 12%;
	position: absolute;
	bottom:-2rem;
}

#upper .info-pic {
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-20%;
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