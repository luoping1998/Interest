<template>
	<div id="topub">
		<div class="p-body">
			<input type="text" class="p-topic" v-model="topic" placeholder="输入帖子主题">
			<textarea class="p-content" v-model="content" placeholder="输入帖子内容"></textarea>
			<div id ="p-add" @click="del">
				<div class="p-append">
					<input type="file" id="add" @change="addimg" name="file">
				</div>
			</div>
			<div class="p-send" v-show="pubc">
				<div class="p-words" @click="pub">发 布</div>
				<div class="p-icon"></div>
			</div>
			<div class="p-send" v-show="!pubc">
				<img :src="gif" height="50%" />
			</div>
		</div>
	</div>
</template>

<script>
import {isLegal} from '../../../static/common.js'
export default{
	name : 'topub',
	data() {
		return {
			topic : '',
			content : '',
			pics : [],
			formdatas : [],
			count : 1,
			pubc : true,
			gif : require('../../../static/loading.gif')
		}
	},
	methods : {
		pub() {
			var arr = document.getElementsByClassName('imgp');
			var formData = new FormData();
			var len = arr.length;
			for(var i = 0; i < len; i ++) {
				this.save(formData, arr[i].style.backgroundImage.split('"')[1],i,len);
			}
			if(!len) {
				var formData = new FormData();
				this.tosend(formData);
			}
		},
		tosend(formData) {
			if(!isLegal(this.content) || this.content.length) {
				this.$store.commit('showpop',{'popif' : true,'words' : '帖子内容不合法或为空！','type' : 1});
			}
			var myData = {
				'u_id' : JSON.parse(sessionStorage.getItem('user')).id,
				'content' : this.content,
				'title' : this.topic,
			};
			this.pubc = false;
			formData.append('infor',JSON.stringify(myData));
			this.$http.post('http://139.199.205.91:8000/msgs/send',formData,{
				emulateJSON : true,
				withCredentials : true}).then(function (res) {
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 0});
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
						this.$store.dispatch({
							type : 'getownMessages'
						});
						this.$router.push('pubed');
					}
			});
		},
		addimg(e) {
			if(this.formdatas.length < 9) {
				var oAdd = document.getElementById('p-add');
				var _this = this;
				var files = e.target.files;
				
				if(files.length) {
					var oPic = document.createElement('div');
					var oclose = document.createElement('div');
					oclose.style.height = '1rem';
					oclose.style.width = '1rem';
					oclose.style.backgroundColor = 'rgba(0,0,0,0.7)';
					oclose.style.position = 'absolute';
					oclose.style.right = 0;
					oclose.style.top = 0;
					oclose.className = 'close';
					oclose.index = _this.count;
					var reader = new FileReader();
					reader.readAsDataURL(files[0]);

					reader.onload = function (e) {
						var base64Code = this.result;
						oPic.className = 'imgp';
						oPic.style.background = 'url(' + base64Code + ') no-repeat';
						oPic.style.backgroundPosition = 'center';
						oPic.style.backgroundSize = 'auto 100% ';
						oPic.style.float = "left";
						oPic.style.marginRight = '0.5rem';
						oPic.style.marginBottom = '0.5rem';
						oPic.style.border = '1px solid lightgray';
						oPic.style.position = 'relative';
						console.log('pic:',oPic);
						_this.count ++;
						oPic.appendChild(oclose);
						oAdd.insertBefore(oPic,oAdd.childNodes[oAdd.childNodes.length-1]);
					}
				}
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' : '最多可以添加9张','type' : 0});
			}
		},
		del(e) {
			if(e.target.index) {
				var oAdd = document.getElementById('p-add');
				var tar = e.target.parentNode;
				oAdd.removeChild(tar);
			}
		},
		save(formData,url,index,len) {
			var oImg = new Image();
			var _this = this;
			oImg.src = url;
			oImg.onload = function(e) {
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
				if(index == len-1) {
					canvas.toBlob(function (blob) {
						formData.append( "file"+index, blob);
						_this.tosend(formData);
					},'image/png');
				}else {
					canvas.toBlob(function (blob) {
						formData.append( "file"+index, blob);
						var data = formData.get("file"+index);
					},'image/png');
				}
					
				
			}
		}
	}
}
</script>

<style scoped>
#topub {
	padding-top: 10%;
	width: 100%;
	height:90%;
}

#topub .p-body {
	width: 90%;
	height: 90%;
	margin:0 auto;
	padding-top: 5%;
	border: 1px solid lightgray;
}

.p-body .p-topic {
	width: 88%;
	/*min-height: 3rem;*/
	height: 10%;
	outline: none;
	border:none;
	font-size: 1rem;
	padding: 0.5rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid lightgray;
}

.p-body .p-content {
	width: 88%;
	/*min-height: 6rem;*/
	height: 35%;
	outline: none;
	font-size: 0.9rem;
	padding: 0.5rem;
	padding-bottom: 1rem;
	margin-top: 1.5rem;
	border: 1px solid lightgray; 
}

.p-body #p-add {
	width: 88%;
	height: 35%;
	margin:0 auto;
	padding-top: 0.5rem;
	flex-direction: row;
	justify-content:space-around;
	position: flex;
	overflow: scroll;
}

#p-add .imgp {
	width: 5rem;
	height: 5rem;
	position: relative;
	border: 1px solid lightgray;
}

.imgp .close {
	width: 1rem;
	height: 1rem;
	position: absolute;
	top: 0;
	right: 0;
	background-color: black;
}

#p-add .p-append {
	width: 5rem;
	height: 5rem;
	float: left;
	border: 1px solid lightgray; 
	background:url('../../../static/icons/g-add.png') no-repeat;
	background-size: 80% auto;
	background-position: center;
}

#p-add .close {
	width: 1rem;
	height: 1rem;
	position: absolute;
	top: 0;
	right: 0;
	background-color:rgba(0,0,0,0.8);
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
	background-color: #2575fc;
	
}

.p-send .p-words {
	width: 69%;
	padding-left: 13%;
	height: 100%;
	float: left;
}

.p-send .p-icon {
	width: 30%;
	height: 100%;
	float: right;
	background: url('../../../static/icons/pub.png') no-repeat;
	background-position: left;
	background-size: 70% auto;
}
</style>