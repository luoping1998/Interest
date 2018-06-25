var Delmsg = function(db, u_id, m_id, callback){
	// console.log('u_id:',u_id);
	// console.log('m_id:',m_id);
	var sql = 'DELETE FROM mgstable WHERE mgsid = ? AND u_id = ?;UPDATE usertable SET msgnum = msgnum - 1 WHERE id = ?;UPDATE mgstable SET content = "该帖已被原用户删除",imgs = "" WHERE origin = ?';
	db.query('SELECT type,origin FROM mgstable WHERE mgsid = ?',[m_id], function(err, data) {
		// console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			var origin = info[0].origin;
			if(info[0].type == 1) {
				db.query('UPDATE mgstable SET Snum = Snum - 1 WHERE mgsid = ?',[origin],function(err, data) {
					// console.log(err,data);
					if(err) {
						callback({
							'error' : true,
							'result' : '数据库出错'
						})
					}else {
						db.query(sql, [m_id, u_id, u_id,m_id], function(err, data) {
							// console.log(err,data);
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
				})
			}else {
				db.query(sql, [m_id, u_id, u_id, m_id], function(err, data) {
					// console.log(err,data);
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
		}
	})
}

module.exports = Delmsg;