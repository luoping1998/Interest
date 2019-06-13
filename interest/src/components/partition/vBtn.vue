<template>
	<div class="vtn" :style="note">
		<div class="center">
			{{ words }}
			<div class="load" v-show="load"></div>
			<div class="leader">></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'vtn',
	props: ['bgcolor', 'bdcolor', 'color', 'words', 'load'],
	data () {
		return {
			note : {
				'backgroundColor': this.bgcolor,
				'color': this.color,
				'border' : '2px solid ' + this.bdcolor
			}
		}
	}
}
</script>

<style scoped>
.vtn {
	width: 73%;
	height: 3rem;
	border-radius: 2rem;
	margin-top: 1.5rem;
	line-height: 3rem;
	font-size: 1rem;
	font-weight: 0.9rem;
	cursor: pointer;
}

.vtn .center {
	width: 100%;
	height: 100%;
	position: relative;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.center .leader {
	width: 20%;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	font-weight: bold;
}

.center .load {
	width: 15vw;
	height: 100%;
	background-image: url('../../../static/loading.gif');
	background-repeat: no-repeat;	
	background-size:  auto 50%;
	background-position: center;
}
</style>