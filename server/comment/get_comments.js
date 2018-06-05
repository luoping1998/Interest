var Getcomments = function(db, m_id, callback){
	var sql = 'SELECT critable.* , usertable.u_name, usertable.path FROM critable,usertable WHERE usertable.id = critable.from_id AND critable.m_id = ?;'
	db.query(sql, [m_id], function(err, data) {
		// console.log(err, data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else{
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}
module.exports = Getcomments;