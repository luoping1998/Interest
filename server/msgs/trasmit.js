var trasmit = function(db, u_id, m_id, title, callback) {
	var ss = 'SELECT content, u_id,o_name FROM mgstable WHERE mgstable.mgsid = ?'
	var sql = 'INSERT INTO mgstable (content, u_id, type, title, origin, o_name) VALUES(?,?,1,?,?,?);UPDATE mgstable SET Snum = Snum+1 WHERE mgsid = ?;UPDATE usertable SET msgnum = msgnum +1 WHERE id = ?;';
	db.query(ss, [m_id], function(err,data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var content = JSON.parse(JSON.stringify(data))[0].content;
			var o_name = JSON.parse(JSON.stringify(data))[0].o_name;
			db.query(sql, [content, u_id, title, m_id,o_name, m_id,u_id], function(err,data) {
				if(err){
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					callback({
						'error' : false,
						'result' : '转发成功'
					})
				}
			})
		}
	})
}

module.exports = trasmit;