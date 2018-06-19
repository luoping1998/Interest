var fs = require('fs');
var Getallreplys = function(db, c_id, callback) {
	var sql = 'SELECT reply.*, usertable.u_name, usertable.path From reply, usertable WHERE reply.c_id = ? AND usertable.id = reply.u_id order by reply.r_date desc;'
	db.query(sql, [c_id], function(err, data) {
		// console.log(err, data)
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

module.exports = Getallreplys;