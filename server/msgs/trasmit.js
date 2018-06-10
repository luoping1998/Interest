var trasmit = function(db, u_id, m_id, title, callback) {
	var ss = 'SELECT content, u_id FROM mgstable WHERE mgsid = ?;'
	var sql = 'INSERT INTO mgstable (content, u_id, type, title, origin) VALUES(?,?,1,?,?);UPDATE mgstable SET Snum = Snum+1 WHERE mgsid = ?;';
	db.query(ss, [m_id], function(err,data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			// console.log(data);
			var content = JSON.parse(JSON.stringify(data))[0].content;
			var origin = JSON.parse(JSON.stringify(data))[0].u_id;
			db.query(sql, [content, u_id, title, origin, m_id], function(err,data) {
				console.log(err);
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