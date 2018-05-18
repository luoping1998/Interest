<template>
	<div class="case" :style="note">
		<div class="icon" :style="inote"></div>
		<div class="imsg">{{words}}</div>
	</div>
</template>

<script>
export default {
	name : 'case',
	props : ['words','icon','height'],
	data () {
		return {
			note : {
				width : '100%',
				height : this.height
			},
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
/*.case .icon {
	width: 35%;
	height: 100%;
	float: left;
	background-color: white;
	background:url('');
}*/
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