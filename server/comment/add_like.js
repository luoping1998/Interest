var Addlike = function(db, m_id, u_id, callback){
	var sql = 'INSERT INTO liketable (m_id, u_id)VALUES(?,?);UPDATE mgstable SET Lnum = Lnum+1 WHERE mgsid = ?;'
	db.query(sql, [m_id, u_id, m_id], function(err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '点赞成功'
			})
		}
	})
}

module.exports = Addlike;