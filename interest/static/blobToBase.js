function blobToBase64(blob, callback) {
	var a = new FileReader();
	console.log(blob);
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
}

export {
	blobToBase64
}

