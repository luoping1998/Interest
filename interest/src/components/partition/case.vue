<template>
	<div class="case" >
		<div class="icon" :style="inote"></div>
		<div class="imsg">{{words}}</div>
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
					background:'url('+ this.icon + ')' + 'no-repeat',
					backgroundSize : '50% auto',
					backgroundPosition : 'center'
				}
			}
		}
}
</script>

<style scoped>
.case {
	width: 100%;
	height: 32%;
	float: left;
}
.case .imsg {
	width: 62%;
	height: 100%;
	float: left;
	font-size: 0.9rem;
	line-height: 2.3rem;
	text-align: left;
	/*letter-spacing: 0.3rem;*/
}
</style>