var blobToBase64 = function(blob, callback) {
	var reader = new FileReader();
	reader.onload = function(e) {
		console.log(e.target.result);
		callback(e.target.result);
	}
	reader.readAsDataURL(blob);
};
module.exports = blobToBase64;