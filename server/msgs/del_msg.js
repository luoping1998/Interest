var Delmsg = function(db, u_id, m_id, callback){
	var sql = 'DELETE FROM mgstable WHERE mgsid = ? AND u_id = ?;UPDATE usertable SET msgnum = msgnum - 1 WHERE id = ?;';
	console.log(u_id, m_id);
	db.query(sql, [m_id, u_id, u_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '删帖成功'
			})
		}
	})
}

module.exports = Delmsg;