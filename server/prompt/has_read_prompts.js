var hasRead = function(db, u_id, callback) {
	db.query('UPDATE prompt SET status = 1, hasread = now() WHERE puser = ? AND status = 0;',[u_id], function(err,data) {
		console.log(err);
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