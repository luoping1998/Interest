//按照id寻找好友
var fs = require('fs');
var getFriend = function (db, id, callback) {
	var sql = 'SELECT `id`,`email`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` , `msgnum`,`path`,`sex`,`show` FROM `usertable` WHERE `id` =' + id;
	var path = '';
	db.query(sql, function(err,data) {
		var infor = JSON.parse(JSON.stringify(data))[0];
		console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			path = './static/pic/' + infor.path;
			// console.log(path);
			fs.readFile(path,function (err,cont) {
				callback({
					'error' : false,
					'result' : infor,
					'pic' : 'data:image/png;base64,'+cont.toString("base64")
				})
			})		
		}
	})
}

module.exports = getFriend;