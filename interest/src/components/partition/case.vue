<template>
	<div class="case" >
		<div class="icon" :style="inote" />
		{{ words }}
	</div>
</template>

<script>
export default {
	name : 'case',
	props : ['words','icon'],
	data () {
		return {
			inote : {
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
	padding: 0 1rem;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9rem;
	line-height: 1.6rem;
	text-align: left;
	cursor: pointer;
}
.case .icon {
	width: 1.5rem;
	height: 1.5rem;
}
</style>