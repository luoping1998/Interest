<template>
	<div class="home-header">
		<cut linkone="world" wordone="世界" linktwo="follow" wordtwo="关注">
		</cut>
	</div>
</template>

<script>
import cut from './partition/cut.vue'
export default {
	name : 'homeHeader',
	components : {
		cut
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
</style>