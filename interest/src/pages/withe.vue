<template>
	<div id="withe">
		<div class="cover">
			<div class="eup"></div>
			<input type="text" placeholder="E-mail">
			<input type="password" placeholder="Password">
			
		</div>
	</div>
</template>

<script>
import vBtn from '../components/partition/vbtn.vue'
export default {
	name : 'withE',
	components : {
		vBtn
	}
}
</script>

<style scoped>
#withe {
	width: 100%;
	height: 100vh;
	background-image: url('../../static/withe.jpg');	
	background-size: auto 100%;
	background-position: right;
}

#withe .cover {
	width: 100%;
	height: 100%;
	background-color: rgba(155,230,250,0.2);
}
#withe .eup {
	width: 10%;
	height: 25%;
}
#withe input {
	border: none;
	border-bottom: thin solid white;
	height: 8vh;
	width: 73vw;
	line-height: 8vh;
	color: white;
	text-align: center;
	outline: none;
	font-size: 1rem;
	background-color: rgba(0,0,0,0);
}

input::-webkit-input-placeholder{
    color:white;
}
input::-moz-placeholder{
    color:white;
}
input:-moz-placeholder{
    color:white;
}
input:-ms-input-placeholder{
    color:white;
}
</style>