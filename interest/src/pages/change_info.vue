<template>
	<div id="info">
		<div class="i-header">
			<div class="back">
				<div class="icon" @click="$router.go(-1)"></div>
			</div>
			<div class="middle">个人资料</div>
			<div class="save">
				<div class="but">保存</div>
			</div>
		</div>
		<div class="picup">
			<div id="pic">
				<input type="file" id="change" @change="upload">
			</div>
		</div>
		<div class="msg">
			<p>点击更换头像</p>
			<div class="iup"></div>
			<div class="ibody">
				<div class="onemsg">
					<div class="val">
						<input type="text" v-model="infor.u_name">
					</div>
					<div class="key">昵称</div>
				</div>
				<div class="sign">
					<textarea class="sbody" v-model="infor.signature"></textarea>
				</div>
				<div class="onemsg">
					<div class="val">{{infor.id}}</div>
					<div class="key">ID号</div>
				</div>
				<div class="onemsg">
					<div class="val">
						<select>
							<option>男</option>
							<option>女</option>
						</select>
					</div>
					<div class="key">性别</div>
				</div>
				<div class="onemsg">

					<div class="key">简介</div>
				</div>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
export default {
	name : 'chInfo',
	methods : {
		upload(e) {
			var id = this.infor.id;
			var _this = this;
			var files =e.target.files;
			var oImg = new Image();
			var oPic = document.getElementById('pic');
			oImg.onload = function() {
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');

				var originW = oImg.width;
				var originH = oImg.height;

				var maxW = 400, maxH = 400;
				var targW = originW, targH = originH;
				if(originW > maxW || originH > maxH) {
					if(originH/originW > maxH/maxW) {
						targH = maxH;
						targW = Math.round(maxH * (originW / originH));
					}else {
						targW = maxW;
						targH = Math.round(maxW * (originH / originW));
					}
				}
					//对图片进行缩放canvas.toblob
				canvas.width = targW;
				canvas.height = targH;
				//清除画布
				context.clearRect(0,0,targW,targH);
				//图片压缩
				context.drawImage(oImg,0,0,targW,targH);
				var newUrl = canvas.toDataURL('image/jpeg', 0.92);
				//canvas转为blob并上传
				canvas.toBlob(function (blob) {
					var formData = new FormData();
					formData.append("file",blob);
					console.log(blob);
					_this.$http.post('http://localhost:8000/users/pho', formData, {emulateJSON : true, withCredentials : true}).then(function(res) {
						console.log(res.bodyText);
						window.blob = res.bodyText;
					})
				},files.type || 'image/png');
			}
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);

			reader.onload = function (e) {
				var base64Code = this.result;
				oImg.src = base64Code;
				oPic.style.background = 'url(\''+base64Code+'\') no-repeat';
				oPic.style.backgroundPosition = 'center';
				oPic.style.backgroundSize = '100% auto';
			}
		}
	},
	data () {
		return {
			infor :{}
		}
	},
	mounted() {
		var user = JSON.parse(sessionStorage.getItem('user'));
	    if(user) {
	      this.infor = user;
	    }else {
	      this.$router.push('/login');
	    }
	}
}
</script>

<style scoped>
#info {
	width: 100%;
	height: 100vh;
	text-align: center;
	letter-spacing: 0.2rem;
	overflow: hidden;
}

#info .i-header {
	width: 100%;
	height: 8vh;
	background-color: pink;
}

.i-header .back {
	height: 100%;
	width: 20%;
	float: left;
}

.back .icon {
	width: 50%;
	height: 100%;
	background:url('../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 70% auto;
}

.i-header .middle {
	width: 60%;
	height: 100%;
	float: left;
	line-height: 8vh;
	font-size:1rem;
}

.i-header .save {
	width: 20%;
	height: 100%;
	float: left;
}

.save .but {
	width: 80%;
	height: 65%;
	background-color:white;
	margin:0 auto;
	margin-top: 1.3vh;
	line-height: 5.5vh;
	font-size: 0.9rem;
}

#info .picup {
	width: 100%;
	height: 10vh;
	border-bottom: 1px solid lightgray;
	border-radius: 50%;
	margin-bottom: 7.5vh;
}

.picup #pic {
	width: 15vh;
	height: 15vh;
	background-size: 100% auto;
	background-position: center;
	border-radius: 50%;
	margin: 0 auto;
	position: relative;
	top: 2.5vh;
}

#pic input {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	right: 0;
	opacity: 0;
}

#info .msg {
	width: 100%;
	height: 70%;
	/*background-color: pink;*/
}

.msg p {
	padding-top: 1.5vh;
	font-size: 0.8rem;
	letter-spacing: 0rem;
}

.msg .iup {
	width: 100%;
	height: 3vh;
}

.msg .ibody {
	width: 100%;
	height: 55vh;
	background-color: white;
}

.ibody .onemsg {
	width: 100%;
	height: 15%;
	line-height: 8vh;
	text-align: left;
	/*border-bottom: 1px solid lightgray;*/
}

.onemsg .key {
	width: 20%;
	height: 100%;
	color: gray;
	float: right;
} 

.onemsg .val {
	width: 70%;
	height: 100%;
	float: right;
	/*border-bottom: 1px solid lightgray*/
}

.val input {
	width: 80%;
	border: none;
	outline: none;
	font-size: 1rem;
}

.ibody .sign {
	width: 100%;
	height: 20%;
	float: right;
}

.sign .sbody {
	width: 55%;
	margin-right: 10vw;
	height: 80%;
	float: right;
	outline: none;
	padding:1vh;
}

.onemsg select {
	outline: none;
	width: 20%;
	height: 60%;
	margin:0 auto;
	margin-top: 1.5vh;
	float: left;
}

.onemsg option {
	outline: none;
}

</style>
