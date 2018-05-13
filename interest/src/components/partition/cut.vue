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
	props:['linkone','linktwo','wordone','wordtwo']
}	
</script>

<style scoped>

.cut {
	width: 33%;
	background-color: pink;
	height: 5.5vh;
	margin: 0 auto;
	margin-top: 2vh;
	border-radius: 50px;
}

.cut .small-link {
	width: 45%;
	height: 80%;
	border-radius: 50px;
	float: left;
	margin-top: 0.55vh;
	margin-left: 3%;
	font-size: 0.9rem;
	line-height: 4.5vh;
}

.router-link-active {
	background-color: white;
	color: pink;
	font-weight: bold;
}
</style>