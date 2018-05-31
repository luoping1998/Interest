var checkExist = function(db, u_id, m_id, callback) {
	var sql = 'SELECT * FROM mgstable WHERE mgsid = ? AND u_id = ?;'
	db.query(sql,[m_id, u_id], function(err, data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else if(data.length) {
			callback({
				'error' : false,
				'result' : 'exist'
			})
		}else {
			callback({
				'error' : true,
				'result' : 'not exist'
			})
		}
	})
}

module.exports = checkExist;