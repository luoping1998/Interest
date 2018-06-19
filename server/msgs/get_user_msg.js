//查找用户id发表过的帖子
var fs = require('fs');
var getUserMsg = function(db, u_id, callback) {
	var sql = 'SELECT mgstable.*,usertable.u_name,usertable.path FROM `mgstable`,`usertable` WHERE mgstable.u_id = ? AND usertable.id = ?';
	db.query(sql, [u_id,u_id],function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var path = JSON.parse(JSON.stringify(data))[0].path;
			fs.readFile('./static/pic/'+path, function(err, cont) {
				callback({
					'error' : false,
					'result' : JSON.parse(JSON.stringify(data)),
					'pic' : 'data:image/png;base64,'+cont.toString("base64")
				})
			})
			
		}
	})
}

module.exports = getUserMsg;