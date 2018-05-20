<template>
	<div class="home-header">
		<cut linkone="world" wordone="世界" linktwo="follow" wordtwo="关注">
		</cut>
		<div class="search" @click = "toSearch"></div>
	</div>
</template>

<script>
import cut from './partition/cut.vue'
export default {
	name : 'homeHeader',
	components : {
		cut
	},
	methods :{
		toSearch () {
			this.$router.push('/search');
		}
	}
}
</script>

<style scoped>
.home-header {
	width: 100%;
	min-height: 9.5vh;
	background-color: rgba(126,177,245);
	position: fixed;
	top: 0;
	right: 0;
}

.home-header .search {
	width: 5.5vh;
	height: 5.5vh;
	position: absolute;
	top: 2vh;
	right: 3vh;
	background:url('../../static/search.png') no-repeat;
	background-position: center;
	background-size: 75% auto;
}
</style>