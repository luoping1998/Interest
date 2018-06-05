var checkLike = function(db, m_id, u_id, callback) {
	var sql = 'SELECT u_id FROM liketable WHERE m_id = ? AND u_id = ?;'
	db.query(sql, [m_id, u_id], function(err,data) {
		// console.log(u_id);
		if(err) {
			callback({
				'error' : true,
				'result' :'数据库出错'
			})
		}else {
			// console.log(data);
			if(data.length){
				callback({
					'error' : true,
					'result' : '你已点过赞了'
				})
			}else {
				callback({
					'error' : false,
					'result' : 'not like'
				})
			}
			
		}
	})
}

module.exports = checkLike;