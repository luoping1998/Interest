<template>
	<div id="topub">
		<div class="p-body">
			<input type="text" class="p-topic" v-model="topic">
			<textarea class="p-content" v-model="content"></textarea>
			<div class="p-add">
				<div class="p-append">
					<input type="file">
				</div>
			</div>
			<div class="p-send">
				<div class="p-words" @click="pub">发 布</div>
				<div class="p-icon"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name : 'topub',
	data() {
		return {
			topic : '',
			content : '',
			pics : []
		}
	},
	methods : {
		pub() {
			console.log('pub');
			var myData = {
				'u_id' : JSON.parse(sessionStorage.getItem('user')).id,
				'content' : this.content
			};
			this.$http.post('http://localhost:8000/msgs/send',myData,{
				emulateJSON : true,
				withCredentials : true}).then(function (res) {
					console.log(res);
					if(res.body.error) {
					}else {
						//更新发表帖
						this.$router.push('pubed');
					}
				});
			}
	}
}
</script>

<style scoped>
#topub {
	padding-top: 10%;
	width: 100%;
	height:100%;
}

#topub .p-body {
	width: 90%;
	height: 90%;
	margin:0 auto;
	border: 1px solid lightgray;
}

.p-body .p-topic {
	width: 80%;
	height: 8%;
	outline: none;
	border:none;
	font-size: 1rem;
	padding: 5px;
	padding-bottom: 3px;
	border-bottom: 1px solid lightgray;
}

.p-body .p-content {
	width: 80%;
	height: 30%;
	outline: none;
	font-size: 0.9rem;
	padding: 8px;
	padding-bottom: 10px;
	margin-top: 15px;
	border: 1px solid lightgray; 
}

.p-body .p-add {
	width: 88%;
	height: 35%;
	margin:0 auto;
	padding-top: 10px;
	position: flex;

	/*border: 1px solid lightgray; */
}

.p-add .p-append {
	width: 8rem;
	height: 8rem;
	float: left;
	border: 1px solid lightgray; 
}

.p-append input {
	width: 100%;
	height: 100%;
	opacity: 0;
}

.p-body .p-send {
	width: 30%;
	height: 2.5rem;
	color: white;
	float: right;
	margin-right:8%;
	line-height: 2.5rem;
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