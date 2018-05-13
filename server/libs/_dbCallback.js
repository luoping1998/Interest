var _callback = function( err, data) {
	if(err){
		return {
			'error' : true,
			'result' : err
		}
	}else {
		return data;
	}
}

module.exports = _callback;