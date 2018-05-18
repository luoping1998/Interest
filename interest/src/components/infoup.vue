<template>
	<div id="upper" :style="note">
		<info-header></info-header>
		<div class="info-img">
			<img :src="infosrc"/>
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
				backgroundImage: "url(" + this.bgsrc + ")",
            	backgroundRepeat: "no-repeat",
            	backgroundSize: "100% auto"
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
	height: 8vh;
	position: absolute;
	bottom: 0;
	background-color: white;
}

#upper img {
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-10vh;
	border-bottom: 2px solid lightgray;
}

</style>