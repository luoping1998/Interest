var fs = require('fs');
var getFriend = function (db, id, callback) {
	var sql = 'SELECT `id`,`email`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` , `msgnum`,`path` FROM `usertable` WHERE `id` =' + id;
	var path = './static/pic/';
	db.query(sql, function(err,data) {
		var infor = JSON.parse(JSON.stringify(data));
		if(err) {
			callback({
				'error' : true,
				'result' : err
			})
		}else {
			path = path + infor.path;
			fs.readFile(path,function (err,cont) {
				callback({
					'error' : false,
					'result' : infor,
					'pic' : cont
				})
			})
			
		}
	})
}

module.exports = getFriend;