function Compress( oFile, oPic, callback){
	oFile.addEventListener('change',function(e){
		var files =e.target.files;
		var oImg = new Image();

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
				callback(formData,blob);
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
	},false)
}

export {
	Compress
}