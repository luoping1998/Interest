//搜索好友
var fs = require('fs');
var searchFriends = function(db, val, callback) {
	var reg = /^[0-9]+.?[0-9]*$/;
	var sql = '';
	var path = './static/pic/';
	if(val) {
		if(reg.test(val)) {
			sql = 'SELECT `id`,`u_name`,`signature`,`u_level`,`path` from usertable WHERE `id` = ' + val +' OR `u_name` LIKE \'' + val +'%\' OR `email` LIKE \'' + val +'%\''; 
		} else {
			sql = 'SELECT `id`,`u_name`,`signature`,`u_level`,`path` from usertable WHERE `u_name` LIKE \'' + val +'%\' OR `email` LIKE \'' + val +'%\''; 
		}
		db.query(sql, function(err, data) {
			console.log(sql);
			if(err) {
				console.log(err);
				callback({
					'error' : true,
					'result' : 'mysql error'
				})
			}else {
				path = path + JSON.parse(JSON.stringify(data)).path;
				fs.readFile(path,function(err,cont) {
					callback({
						'error' : false,
						'pic' : cont,
						'result' : JSON.stringify(JSON.parse(JSON.stringify(data)))
					})
				})
				
			}
		})
	}else {
		callback({
			'error' : false,
			'result' : ''
		})
	}
	
}

module.exports = searchFriends;