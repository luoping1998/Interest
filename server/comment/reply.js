var reply = function(db, c_id, cont, u_id, callback) {
	var sql = 'INSERT INTO reply (c_id, r_cont, u_id) VALUES (?,?,?);UPDATE critable SET reply = reply+1 WHERE c_id = ?;';
	db.query(sql, [c_id, cont, u_id, c_id], function(err, data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '回复成功'
			})
		}
	})
}

module.exports = reply;