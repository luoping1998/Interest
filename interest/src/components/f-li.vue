<template>
	<div class="f-li">
		<div class="f-left" :style="note"></div>
		<div class="f-right">
			<div class="f-name">{{info.u_name}}</div>
			<div class="f-sign">{{info.signature}}</div>
		</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name : 'fli',
	props : ['info','pic'],
	data() {
		return {
			note : {
				'background' : 'url('+this.pic +') no-repeat',
				'backgroundPosition' : 'center',
				'backgroundSize' : '100% auto'
			}
		}
	}
}
</script>

<style>
.f-li {
	width: 100%;
	height: 7rem;
	border-bottom: 1px solid lightgray;
	letter-spacing: 0.2rem;
	text-align: left;
}

.f-li .f-left {
	width: 4rem;
	height: 4rem;
	margin: 1rem;
	float: left;
	border-radius: 90%;
}

.f-li .f-right {
	width: 70%;
	height: 100%;
	float: left;
}

.f-right .f-name {
	width: 100%;
	height: 3.3rem;
	font-size: 1.2rem;
	line-height: 4rem;
}

.f-right .f-sign {
	width: 100%;
	height: 3rem;
	font-size: 0.8rem;
	line-height: 1.5rem;
	letter-spacing: 0.1rem;
	color: gray;
}
</style>