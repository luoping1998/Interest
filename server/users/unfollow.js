var unFollow = function(db, fans, star, callback) {
	var sql = 'UPDATE usertable SET fansnum = fansnum - 1 WHERE id = ?; UPDATE usertable SET starnum = starnum - 1 WHERE id = ?; DELETE FROM foltable WHERE star = ? AND fans = ? ;'
	db.query(sql, [star-0, fans-0, star-0, fans-0], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '取消关注成功'
			})
		}
	})
}

module.exports = unFollow;