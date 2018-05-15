<template>
	<div class="vBtn" :style="note">
		<div class="center">
		{{words}}
			<div class="load" v-show="load"></div>
			<div class="leader">></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'vBtn',
	props: ['bgcolor','bdcolor','color','words','load'],
	data () {
		return {
			note : {
				'width': '70vw',
				'height': '7vh',
				'borderRadius': '50px',
				'backgroundColor': this.bgcolor,
				'marginTop': '3.8vh',
				'color': this.color,
				'lineHeight' : '7vh',
				'fontSize' : '1rem',
				'font-weight': '520',
				'border' : '2px solid ' + this.bdcolor
			}
		}
	}
}
</script>

<style scoped>
* {
	padding: 0;
	margin:0 auto;
}

.vBtn .center {
	width: 100%;
	height: 100%;
	margin:0 auto;
	position: relative;
	text-align: center;
}

.center .leader {
	width: 15vw;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	font-weight: bold;
}

.center .load {
	width:15vw;
	height: 100%;
	background-image: url('../../../static/loading.gif');
	background-repeat: no-repeat;	
	background-size: 50% auto;
	background-position: center;
}
</style>