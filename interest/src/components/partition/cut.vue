<template>
	<div class="cut">
		<router-link :to="linkone" class="small-link">{{wordone}}</router-link>
		<router-link :to="linktwo" class="small-link">{{wordtwo}}</router-link>
	</div>
</template>

<script>
/*
 	linkone : 跳转的链接1
	wordone : 跳转链接对应名称 two同one
*/
export default {
	name: 'cut',
	props:['linkone', 'linktwo', 'wordone', 'wordtwo']
}	
</script>

<style scoped>
.cut {
	width: 30%;
	height: 1.6rem;
	padding: 0.3rem;
	display: flex;
	flex-direction: row;
	border-radius: 50px;
	background-color:#005bea;
}

.cut .small-link {
	color:white;
	width: 50%;
	height: 100%;
	border-radius: 50px;
	font-size: 0.9rem;
	line-height: 1.6rem;
}

.cut .router-link-active {
	background-color: white;
	color:#005bea;
	font-weight: bold;
}
</style>