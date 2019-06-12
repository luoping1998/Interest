<template>
	<div class="case" >
		<div class="icon" :style="inote"></div>
		<div class="imsg">{{ words }}</div>
	</div>
</template>

<script>
export default {
	name : 'case',
	props : ['words','icon'],
	data () {
		return {
			inote : {
					width: '38%',
					height: '100%',
					float: 'left',
					backgroundColor: 'white',
					background:`url(${this.icon}) no-repeat`,
					backgroundSize : 'auto 90%',
					backgroundPosition : 'center'
				}
			}
		}
}
</script>

<style scoped>
.case {
	width: 100%;
	height: 20%;
	margin-top: 2.5%;
	margin-bottom: 2.5%;
	float: left;
}
.case .imsg {
	width: 62%;
	height: 100%;
	float: left;
	font-size: 0.9rem;
	line-height: 1.6rem;
	text-align: left;
}
</style>