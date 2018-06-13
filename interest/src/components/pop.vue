<template>
	<div class="pop">
		<div class="pop-bd">
			<div class="pop-hd">
				<div class="sad" v-show="!type"></div>
				<div class="happy" v-show="type"></div>
			</div>
			<div class="pop-cont">
				{{words}}
			</div>
			<div class="pop-btn" @click="popnone">确定</div>
		</div>
	</div>
</template>

<script>
import {bus} from '../../static/js/bus.js'
export default {
	name : 'pop',
	methods : {
		popnone () {
			this.$store.commit("showpop",{'popif' : false,'words' : '','type' : 0});
		}
	},
	props : ['words','type']
}
</script>

<style scoped>
.pop {
	width: 100%;
	height: 100vh;
	background-color: rgba(0,0,0,0.5);
	position: fixed;
	letter-spacing: 0.1rem;
	z-index: 9;
}

.pop .pop-bd {
	width: 80%;
	border-radius: 10px;
	height: 12.5rem;
	margin: 50% auto;
	background-color: white;
}

.pop-bd .pop-hd {
	width: 100%;
	height: 6.5rem;
}
.pop-hd .sad {
	width: 100%;
	height: 100%;
	background:url('../../static/icons/error.png') no-repeat;
	background-size: auto 70%;
	background-position: center;
}

.pop-hd .happy {
	width: 100%;
	height: 100%;
	background:url('../../static/icons/suc.png') no-repeat;
	background-size: auto 70%;
	background-position: center;
}

.pop-bd .pop-cont {
	width: 80%;
	height: 2rem;
	margin: 0 auto;
	color: rgb(100,177,255);
}

.pop-cont .pop-top {
	width: 100%;
	height: 50%;
}

.pop-bd .pop-btn {
	width: 30%;
	border-radius: 90px;
	height: 2rem;
	margin: 3% auto;
	line-height: 2rem;
	font-size: 0.9rem;
	color:white;
	background-color: rgb(100,177,255);
}
</style>