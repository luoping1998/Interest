var addPromp = require('../libs/addPromp.js');
var Addlike = function(db, m_id, u_id, callback){
	var sql = 'INSERT INTO liketable (m_id, u_id)VALUES(?,?);UPDATE mgstable SET Lnum = Lnum+1 WHERE mgsid = ?;'
	db.query(sql, [m_id, u_id, m_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			db.query('SELECT u_name FROM usertable WHERE id = ? ; SELECT u_id,content,imgs FROM mgstable WHERE mgsid = ?;',[u_id, m_id], function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var info = JSON.parse(JSON.stringify(data));
					var cont = info[1][0].content + (info[1][0].imgs ? ' [图片] ' : '');
					var sql = 'INSERT INTO prompt (m_id, u_id, p_type, puser, m_cont, uname) VALUES(?,?,?,?,?,?);';
					var args = [m_id, u_id, '点赞', info[1][0].u_id, cont, info[0][0].u_name]
					addPromp(db, sql, args, function(data) {
						if(data.error) {
							callback(data)
						}else {
							callback({
								'error' : false,
								'result' : '点赞成功'
							})
						}
					})
				}
			})
		}
	})
}

module.exports = Addlike;