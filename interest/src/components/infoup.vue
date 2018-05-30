<template>
	<div id="upper" :style="note">
		<info-header></info-header>
		<div class="info-img">
			<div class="pic" :style="pic"></div>
		</div>
	</div>
</template>

<script>
import infoHeader from './m-header.vue'
export default {
	name: 'upper',
	components: {
		infoHeader
	},
	props: ['infosrc','bgsrc'],
	data:  function() {
		return {
			note:{
				background: "url(" + this.bgsrc + ") no-repeat",
            	backgroundSize: "100% auto"
			},
			pic : {
				background: "url(" + sessionStorage.getItem('pic') + ") no-repeat",
            	backgroundPosition: "center",
            	backgroundSize: "100% auto",
            	backgroundColor : 'white'
			}
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
	height: 20%;
	position: absolute;
	background-color: white;
	bottom: 0;
}

#upper .pic {
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-18%;
	border-bottom: 2px solid lightgray;
}

</style>