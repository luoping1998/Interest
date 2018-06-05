//获取最新的帖子
var fs = require('fs');
var getNew = function(db, start, callback) {
	var sql = 'SELECT mgstable.*, usertable.u_name, usertable.path FROM `mgstable` LEFT JOIN `usertable` on mgstable.u_id = usertable.id AND mgstable.type = 0 ORDER BY mgstable.date DESC LIMIT ?,?';
	db.query(sql, [start-0, start-0+10], function(err, data) {
		// console.log(err,data);
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

module.exports = getNew;