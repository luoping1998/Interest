var addPromp = require('../libs/addPromp.js');
var trasmit = function(db, u_id, m_id, title, callback) {
	var ss = 'SELECT content, u_id,o_name,imgs FROM mgstable WHERE mgstable.mgsid = ?'
	var sql = 'INSERT INTO mgstable (content, u_id, type, title, origin, o_name,imgs,date) VALUES(?,?,1,?,?,?,?,now());SELECT LAST_INSERT_ID() FROM mgstable; UPDATE mgstable SET Snum = Snum+1 WHERE mgsid = ?; UPDATE usertable SET msgnum = msgnum +1 WHERE id = ?;';
	db.query(ss, [m_id], function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data))[0];
			var content = info.content;
			var o_name = info.o_name;
			var id = info.u_id;
			var imgs = info.imgs;
			db.query(sql, [content, u_id, title, m_id, o_name, imgs, m_id, u_id], function(err,data) {
				var to = JSON.parse(JSON.stringify(data))[0].insertId;
				console.log(err,data);
				if(err){
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					db.query('SELECT u_name FROM usertable WHERE id = ?', [u_id], function(err,data) {
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							})
						}else {
							var u_name = JSON.parse(JSON.stringify(data))[0].u_name;
							var p_type = '转发了你的帖子';
							var str = 'INSERT INTO prompt (m_id, u_id, uname, puser, m_cont, p_type, p_cont, t_id, n_id) VALUES(?,?,?,?,?,?,?,?,?);';
							var m_cont = content + (imgs.length ? '[图片]' : '');
							
							var args = [m_id, u_id, u_name, id, m_cont, p_type,title,3,to];
							addPromp(db, str, args,  function(data) {
								if(data.error) {
									callback(data);
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
			})
		}
	})
}

module.exports = trasmit;