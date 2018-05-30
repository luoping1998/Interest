var blobToBase64 = function(blob, callback) {
	var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
};
module.exports = blobToBase64;

