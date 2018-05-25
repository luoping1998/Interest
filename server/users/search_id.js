var fs = require('fs');
var searchByid = function (db, id, callback) {
	var sql = 'SELECT `id`,`email`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` , `msgnum`,`path` FROM `usertable` WHERE `id` = \'' + id +'\'';
	db.query(sql, function( err, data) {
		var infor = JSON.parse(JSON.stringify(data));
		var path = './static/pic/';
		if(err) {
			callback({
				'error' : true,
				'result' : err
			})
		}else {
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

module.exports = searchByid;