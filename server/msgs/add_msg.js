//用户uid发表帖子
var addMsg = function( db, uid, content, title,callback) {
	var	str = 'INSERT INTO `mgstable` (`u_id`,`content`,`title`,`Lnum`,`Snum`,`Cnum`) VALUES ( ?, ?, ?, 0, 0, 0);';
	var ss = 'UPDATE usertable SET msgnum = msgnum + 1 WHERE id = ?';
	db.query(str , [uid, content,title], function( err, data) {
		// var myData = JSON.parse(JSON.stringify(data));
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			});
		}else{
			db.query(ss, [uid], function(err, data) {
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

module.exports = addMsg ;