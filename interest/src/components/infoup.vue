<template>
	<div id="upper">
		<info-header />
		<div class="info-img">
			<div class="info-pic" :style="pic"></div>
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
	height: 15rem;
	background: url("../../static/zsm.jpg") no-repeat;
  background-size: 100% auto;
	position: relative;
}

#upper .info-img {
	width: 100%;
	height: 2rem;
	position: absolute;
	background-color: white;
	bottom: -1px;
}

#upper .info-pic {
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	display: inline-block;
	text-align:center;
	margin-top: -3rem;
	background-position: center;
	background-size: 100% auto;
	border-bottom: 2px solid lightgray;
}

#upper .icon {
	width: 2.5rem;
	height: 2.5rem;
	background:url('../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 80% auto;
	cursor: pointer;
}
</style>