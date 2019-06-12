<template>
	<div id="upper">
		<info-header />
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
	computed : {
		pic() {
			return {
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
	height: 50%;
	position: relative;
	background: url('../../static/zsm.jpg') no-repeat;
  background-size: 100% auto;
}

#upper .info-img {
	width:100%;
	height: 20%;
	position: absolute;
	background-color: white;
	bottom: -1px;
}

#upper .pic {
	width:24%;
	height:0;
	padding-bottom:24%;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top:-13%;
	border-bottom: 2px solid lightgray;
}

</style>