var fs = require('fs');
var getReply = function(db, c_id, callback) {
	var sql = 'SELECT reply.*, usertable.path, usertable.u_name FROM reply WHERE reply.c_id = c_id AND usertable.id = reply.u_id';
	db.query(sql, [c_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			var i,len;
			var path = './static/pic/';
			var pics = [];
			len = info.length;
			for(i = 0; i < len; i ++) {
				var data = 'data:image/png;base64,'+ fs.readFileSync(path + info[i].path).toString("base64");
				pics.push(data);
			}
			callback({
				'error' : false,
				'result' : info,
				'pics' : pics
			})
		}
	})
}

module.exports = getReply;