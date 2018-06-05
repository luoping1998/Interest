var Addcomment = function(db, from, to, content, m_id, callback) {
	var sql = 'INSERT INTO critable (from_id, to_id, content, m_id)VALUES(?,?,?,?);';
	var ss = 'UPDATE mgstable SET Cnum = Cnum + 1 WHERE mgsid = ?';
	db.query(sql, [from-0, to-0, content, m_id-0], function(err, data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			db.query(ss, [m_id-0], function(err, data) {
				console.log(err);
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					callback({
						'error' : false,
						'result' : '评论成功'
					})
				}
			})
			
		}
	})
}

module.exports = Addcomment;