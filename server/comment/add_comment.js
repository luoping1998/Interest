var addPromp = require('../libs/addPromp.js');
var Addcomment = function(db, from, to, content, m_id, callback) {
	var sql = 'INSERT INTO critable (from_id, to_id, content, m_id)VALUES(?,?,?,?);SELECT LAST_INSERT_ID();';
	var ss = 'UPDATE mgstable SET Cnum = Cnum + 1 WHERE mgsid = ?';
	db.query(sql, [from-0, to-0, content, m_id-0], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var c_id = JSON.parse(JSON.stringify(data))[0].insertId;
			db.query(ss, [m_id-0], function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					db.query('SELECT usertable.u_name,mgstable.content,mgstable.imgs FROM usertable,mgstable WHERE usertable.id = ? AND mgstable.mgsid = ?', [from, m_id], function(err,data) {
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							var u_name = JSON.parse(JSON.stringify(data))[0].u_name;
							var m_cont = JSON.parse(JSON.stringify(data))[0].content;
							var imgs = JSON.parse(JSON.stringify(data))[0].imgs;
							var p_cont = content + (imgs.length ? ' [图片] ' : '');
							var p_type = '评论';
							var args = [m_id, from, p_cont, c_id, to, u_name, m_cont, p_type];
							var str = 'INSERT INTO prompt (m_id, u_id, p_cont, c_id, puser, uname, m_cont, p_type) VALUES (?,?,?,?,?,?,?,?)';
							addPromp(db, str, args, function(data) {
								console.log(data);
								if(data.error) {
									callback(data);
								}else {
									callback({
										'error' : false,
										'result' : '评论成功'
									})
								}
							})
						}	
					})
					
				}
			})
			
		}
	})
}

module.exports = Addcomment;