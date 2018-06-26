var addPromp = function(db, str, args, callback) {
	db.query(str, args, function(err, data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '插入成功'
			})
		}
	})
}

module.exports = addPromp;