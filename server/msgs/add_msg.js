//用户uid发表帖子
var addMsg = function( db, uid, content, title, imgs, callback) {
	db.query('SELECT u_name FROM usertable WHERE id = ?',[uid],function(err,data) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			});
		}else {
			var o_name = JSON.parse(JSON.stringify(data))[0].u_name;
			var	str = 'INSERT INTO `mgstable` (`u_id`,`content`,`title`,`Lnum`,`Snum`,`Cnum`,`origin`,`o_name`,`imgs`) VALUES ( ?, ?, ?, 0, 0, 0,?,?,?);';
			var ss = 'UPDATE usertable SET msgnum = msgnum + 1 WHERE id = ?';
			db.query(str , [uid, content,title,uid,o_name,imgs], function( err, data) {
				// var myData = JSON.parse(JSON.stringify(data));
				console.log(err);
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					});
				}else{
					db.query(ss, [uid], function(err, data) {
						console.log(err);
						if(err) {
							callback({
								'error' : true,
								'result' : '数据库出错'
							});
						}else{
							callback({
								'error' : false,
								'result' :'发帖成功'
							})
						}
					});
				}
			})
		}
	})
	
}

module.exports = addMsg ;