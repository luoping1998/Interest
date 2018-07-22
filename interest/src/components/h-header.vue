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
	height: 3rem;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);
	position: fixed;
	top: 0;
	right: 0;
}

.home-header .search {
	width: 3rem;
	height: 3rem;
	position: absolute;
	right: 0;
	bottom: 0;
	background:url('../../static/icons/search.png') no-repeat;
	background-position: center;
	background-size: 50% auto;
}
</style>