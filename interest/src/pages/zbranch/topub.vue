<template>
	<transition
		name="custom-classes-transition"
    	enter-active-class="animated fadeIn"
	>
	<div id="topub">
		<div class="p-body">
			<input type="text" class="p-topic" v-model="topic" placeholder="输入帖子主题">
			<textarea class="p-content" v-model="content" placeholder="输入帖子内容" />
			<div id ="p-add" @click="del">
				<div class="p-append">
					<input type="file" id="add" @change="addimg" name="file" />
				</div>
			</div>
			<div class="p-send" v-show="pubc">
				<div class="p-words" @click="pub">发 布</div>
				<div class="p-icon" />
			</div>
			<div class="p-send" v-show="!pubc">
				<div class="load" />
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
import '../../../static/animate.min.css'
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
			this.pubc = false;
			var arr = document.getElementsByClassName('imgp');
			var formData = new FormData();
			var len = arr.length;
			if (!this.content.length && !len) {
				this.$store.commit('showpop',{'popif' : true,'words' :'内容为空！','type' : 0});
				this.pubc = true;
				return;
			}

			if(isLegal(this.content)){
				for(let i = 0; i < len; i ++) {
					this.save(formData, arr[i].style.backgroundImage.split('"')[1],i,len);
				}
				if(!len) {
					let formData = new FormData();
					this.tosend(formData,len);
				}
			}else {
				this.$store.commit('showpop',{'popif' : true,'words' :'内容违法！','type' : 0});
				this.pubc = true;
			}
		},
		tosend(formData) {
			var myData = {
				'u_id' : JSON.parse(sessionStorage.getItem('user')).id,
				'content' : this.content,
				'title' : this.topic,
			};
			formData.append('infor',JSON.stringify(myData));
			this.$http.post('http://139.199.205.91:8000/msgs/send',formData,{
				emulateJSON : true,
				withCredentials : true}).then(function (res) {
					if(res.body.error) {
						this.$store.commit('showpop',{'popif' : true,'words' :res.body.result,'type' : 0});
						this.$router.push('/login');
					}else {
						this.$store.commit('showpop',{'popif' : true,'words' : res.body.result,'type' : 1});
						this.$store.dispatch({
							type : 'getownMessages'
						});
						this.$store.dispatch({
							type : 'getownInfo'
						});
						this.$router.push('pubed');
					}
					this.pubc = true;
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
				var maxW = 200, maxH = 200;
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

<style>
#topub {
	width: 100%;
	min-height: 100%;
	padding-top: 1.5rem;
	margin-top: 3rem;
}

#topub .p-body {
	width: 90%;
	height: 75vh;
	margin:0 auto;
	padding: 1rem;
	border: 1px solid lightgray;
	box-sizing: border-box;
}

.p-body .p-topic {
	width: 100%;
	height: 3rem;
	outline: none;
	border:none;
	font-size: 1rem;
	padding: 0.5rem;
	padding-bottom: 0.5rem;
	border-bottom: 1px solid lightgray;
	box-sizing: border-box;
}

.p-body .p-content {
	width: 100%;
	height: 8rem;
	outline: none;
	font-size: 0.9rem;
	padding: 0.5rem;
	padding-bottom: 0.5rem;
	margin: 0;
	margin-top: 1.5rem;
	border: 1px solid lightgray; 
	box-sizing: border-box;
}

.p-body #p-add {
	width: 100%;
	height: 6rem;
	margin:0 auto;
	flex-direction: row;
	justify-content:space-around;
	position: flex;
	overflow: scroll;
}

.imgp {
	width: 5rem;
	height: 5rem;
	margin-bottom: 0.5rem;
	float: left;
	margin-right: 2%;
	position: relative;
	border: 1px solid lightgray;
}

.imgp .close {
	width: 1rem;
	height: 1rem;
	position: absolute;
	top: 0;
	right: 0;
	background:url('../../../static/icons/close.png') no-repeat;
	background-size: 100% 100%;
}

#p-add .p-append {
	width: 5rem;
	height: 5rem;
	border: 1px solid lightgray; 
	background:url('../../../static/icons/g-add.png') no-repeat;
	background-size: 80% auto;
	background-position: center;
	float: left;
}

.p-append input {
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}

.p-body .p-send {
	width: 6rem;
	height: 2.5rem;
	color: white;
	line-height: 2.5rem;
	background-color: #2575fc;
	cursor: pointer;
	float: right;
	display: flex;
	align-items: center;
	justify-content: center;
}

.p-send .p-words {
	height: 100%;
	margin-right: 0.5rem;
}

.p-send .load {
	width: 100%;
	height: 100%;
	background: url('../../../static/loading.gif') no-repeat;
	background-position: center;
	background-size: auto 70%;
}

.p-send .p-icon {
	width: 1.6rem;
	height: 2rem;
	background: url('../../../static/icons/pub.png') no-repeat;
	background-position: left;
	background-size: auto 80%;
}
</style>