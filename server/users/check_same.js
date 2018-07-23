var checkSame = function(db, email, uname, callback) {
	db.query('SELECT `u_name` FROM usertable WHERE `email` = ? AND `u_name` = ?',[email, uname], function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错' 	
			})
		}else {
			if(data.length) {
				callback({
					'error' : false,
					'result' : '用户匹配'
				})
			}else {
				callback({
					'error' : true,
					'result' : '用户不存在或用户信息不匹配'
				})
			}
		}
	})
}

module.exports = checkSame;