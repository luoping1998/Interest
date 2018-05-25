<template>
	<div id="topub">
		<div class="p-body">
			<input type="text" class="p-topic">
			<textarea class="p-content"></textarea>
			<div class="p-add">
				<div class="p-append"></div>
			</div>
			<div class="p-send">
				<div class="p-words">发 布</div>
				<div class="p-icon"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name : 'topub'
}
</script>

<style scoped>
#topub {
	padding-top: 12vh;
	width: 100%;
	height:80vh;
}

#topub .p-body {
	width: 90%;
	height: 90%;
	margin:0 auto;
	border: 1px solid lightgray;
}

.p-body .p-topic {
	width: 80%;
	height: 5vh;
	outline: none;
	border:none;
	font-size: 1rem;
	padding: 2vh;
	padding-bottom: 1vh;
	border-bottom: 1px solid lightgray;
}

.p-body .p-content {
	width: 80%;
	height: 30%;
	outline: none;
	font-size: 0.9rem;
	padding: 2vh;
	padding-bottom: 1vh;
	margin-top: 3vh;
	border: 1px solid lightgray; 
}

.p-body .p-add {
	width: 88%;
	height: 20vh;
	margin:0 auto;
	padding-top: 2vh;
	/*border: 1px solid lightgray; */
}

.p-add .p-append {
	width: 20vh;
	height: 20vh;
	display: block;
	outline: none;
	border: 1px solid lightgray; 
}

.p-body .p-send {
	width: 30vw;
	height: 6vh;
	color: white;
	float: right;
	margin:5vw;
	line-height: 6vh;
	background-color: rgb(126,177,245);
}

.p-send .p-words {
	width: 50%;
	padding-left: 13%;
	height: 100%;
	float: left;
}

.p-send .p-icon {
	width: 30%;
	height: 100%;
	float: left;
	background: url('../../../static/icons/pub.png') no-repeat;
	background-position: left;
	background-size: 70% auto;
}
</style>