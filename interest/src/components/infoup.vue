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
	height: 50%;
	position: relative;
}

#upper .info-img {
	width:100%;
	height: 10vh;
	position: absolute;
	bottom: 0;
	background-color: white;
}

#upper img {
	width: 7.5rem;
	height: 7.5rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-10vh;
}

</style>