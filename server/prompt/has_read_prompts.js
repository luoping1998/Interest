var hasRead = function(db, u_id, callback) {
	db.query('UPDATE prompt SET status = 1, hasdate = now() WHERE u_id = ? AND status = 0;',[u_id], function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '已阅'
			})
		}
	})
}

module.exports = hasRead;