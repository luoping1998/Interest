var unFollow = function(db, fans, star, callback) {
	var sql = 'UPDATE usertable SET fansnum = fansnum - 1 WHERE id = ?; UPDATE usertable SET starnum = starnum - 1 WHERE id = ?; DELETE FROM foltable WHERE star = ? AND fans = ? ;'
	db.query(sql, [star-0, fans-0, star-0, fans-0], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else {
			callback({
				'error' : false,
				'result' : 'un follow success'
			})
		}
	})
}

module.exports = unFollow;