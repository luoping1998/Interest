var addPromp = require('../libs/addPromp.js');
var reply = function(db, c_id, cont, u_id, callback) {
	var sql = 'INSERT INTO reply (c_id, r_cont, u_id) VALUES (?,?,?);UPDATE critable SET reply = reply+1 WHERE c_id = ?;';
	db.query(sql, [c_id, cont, u_id, c_id], function(err, data) {
		// console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			db.query('SELECT critable.from_id, critable.content, critable.m_id, usertable.u_name FROM critable, usertable WHERE critable.c_id = ? AND usertable.id = ? ;',[c_id, u_id], function(err,data) {
				console.log(err);
				if(err) {
					callback({
						'error' : true,
						'result' :'数据库出错'
					})
				}else {
					var m_cont = JSON.parse(JSON.stringify(data))[0].content;
					var uname = JSON.parse(JSON.stringify(data))[0].u_name;
					var m_id = JSON.parse(JSON.stringify(data))[0].m_id;
					var puser = JSON.parse(JSON.stringify(data))[0].from_id;
					var args = [m_id, m_cont, cont, c_id, '回复你的评论', uname, u_id, 4, puser];
					var str = 'INSERT INTO prompt (m_id, m_cont, p_cont, c_id, p_type, uname, u_id, t_id, puser) VALUES (?,?,?,?,?,?,?,?,?);';
					addPromp(db, str, args, function(data) {
						if(data.error) {
							callback(data);
						}else {
							callback({
								'error' : false,
								'result' : '回复成功'
							})
						}
					})
				}
			})			
		}
	})
}

module.exports = reply;