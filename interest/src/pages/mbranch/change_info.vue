<template>
	<div id="info">
		<div class="i-header">
			<div class="back">
				<div class="icon" @click="$router.go(-1)"></div>
			</div>
			<div class="middle">个人资料</div>
			<div class="save">
				<div class="but" @click="save">保存</div>
			</div>
		</div>
		<div class="picup">
			<div id="pic" :style="note">
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
						<span class="hint" v-show="show">*用户名重复</span>
					</div>
					<div class="key">昵称</div>
				</div>
				<div class="onemsg">
					<div class="val">{{infor.id}}</div>
					<div class="key">ID号</div>
				</div>
				<div class="onemsg">
					<div class="val">
						{{infor.sex}}
						<span style="font-size:0.9rem;" @click="chsex">▼</span>
					</div>
					<div class="key">性别</div>
				</div>
				<div class="onemsg" style="height:15%">
					<div class="sign">
						<textarea class="sign-bd" v-model="infor.signature"></textarea>
					</div>

					<div class="key">签名</div>
				</div>
				<div class="onemsg" style="margin-top:20px;margin-bottom:2rem;" @click="chshow">
					<div class="val" style="font-size:0.9rem;color:gray" v-show="Boolean(infor.show) == true">设置在个人资料页显示 ></div>
					<div class="val" style="font-size:0.9rem;color:gray" v-show="Boolean(infor.show) == false">设置在个人资料页隐藏 ></div>
					<div class="key">邮箱</div>
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
			var files = e.target.files;
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
				var newUrl = canvas.toDataURL('image/jpeg', 0.5);
				//canvas转为blob并上传
				canvas.toBlob(function (blob) {
					var formData = new FormData();
					formData.append("file",blob);
					_this.$http.post('http://139.199.205.91:8000/users/pho', formData, {emulateJSON : true, withCredentials : true}).then(function(res) {
							// console.log(res);
							if(res.body.error) {
							this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
							}else {
								this.$store.commit('savepic',res.body.pic);
							}
							
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
				oPic.style.backgroundSize = 'auto 100% ';
				oPic.style.backgroundColor = 'white';
			}
		},
		save() {
			this.$http.post('http://139.199.205.91:8000/users/save',JSON.parse(JSON.stringify(this.infor)),{
				emulateJSON : true,
				withCredentials : true
			}).then(function(res) {
				if(res.body.error) {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.msg,'type' : 0});
				}else {
					this.$store.commit('showpop',{'popif' : true,'words' : res.body.msg,'type' : 1});
					console.log(res.body.infor);
					this.$router.go(-1);
				}
			})
		},
		chshow() {
			this.infor.show = !this.infor.show;
			console.log('click',this.infor.show);
		},
		chsex() {
			if(this.infor.sex == '男') {
				this.infor.sex = '女';
			}else {
				this.infor.sex = '男';
			}
			console.log('click',this.infor.sex);
		}
	},
	data () {
		return {
			show : false,
			note : {
				'background' : 'url(' + this.$store.state.selfinfo.pic + ') no-repeat' ,
				'backgroundSize' : '100% auto',
				'backgroundPosition' : 'center' ,
            	'backgroundColor' : 'white'
			},
			infor : this.$store.state.selfinfo.info
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
	overflow: scroll;
}

#info .i-header {
	width: 100%;
	height: 3.5rem;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);

}

.i-header .back {
	height: 100%;
	width: 20%;
	float: left;
}

.back .icon {
	width: 50%;
	height: 100%;
	background:url('../../../static/icons/return.png') no-repeat;
	background-position: center;
	background-size: 70% auto;
}

.i-header .middle {
	width: 60%;
	height: 100%;
	float: left;
	line-height: 3.5rem;
	font-size:1rem;
	color: white;
}

.i-header .save {
	width: 20%;
	height: 100%;
	float: left;
}

.save .but {
	width: 80%;
	height: 2rem;
	background-color:white;
	margin:0 auto;
	margin-top: 15%;
	line-height: 2rem;
	font-size: 0.9rem;
	color: #2575fc;
}

#info .picup {
	width: 100%;
	height: 20%;
	margin-bottom: 15%;
	background-image: linear-gradient(120deg, #7eb1f5 0%, #2575fc 100%);

}

.picup #pic {
	width: 6rem;
	height: 6rem;
	border-radius: 50%;
	margin: 0 auto;
	position: relative;
	top: 60%;
	border-bottom: 1px solid lightgray;
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
	height: 60%;
}

.msg p {
	padding-top: 1rem;
	font-size: 0.8rem;
	letter-spacing: 0rem;
}

.msg .iup {
	width: 100%;
	height: 5%;
}

.msg .ibody {
	width: 100%;
	height: 75%;
	background-color: white;
}

.ibody .onemsg {
	width: 100%;
	min-height: 3rem;
	height: 15%;
	line-height: 4rem;
	text-align: left;
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
	line-height: 4rem;
}

.val input {
	width: 50%;
	border: none;
	outline: none;
	font-size: 1rem;
}

.val .hint{
	color: red;
	font-size: 0.8rem;
}
.onemsg .sign {
	width: 70%;
	height: 100%;
	margin-top: 3%;
	float: right;
	border:none;
}

.sign .sign-bd {
	margin-top:10px;
	width: 80%;
	padding: 8px;
	height: 80%;
	font-size: 0.9rem;
	outline: none;
	display: block;
	float: left;
}
</style>
