//用户uid发表帖子
var addMsg = function( db, uid, content, callback) {
	var	str = 'INSERT INTO `mgstable` (`u_id`,`content`,`Lnum`,`Snum`,`Cnum`) VALUES (' + uid +',\'' + content +'\', 0, 0, 0)';
	db.query(str , function( err, data) {
		var myData = JSON.parse(JSON.stringify(data));
		if(err) {
			callback({
				'error' : true,
				'result' :err
			});
		}else{
			callback({
				'error' : false,
				'result' :'send message success'
			})
		}
	})
}

module.exports = addMsg ;