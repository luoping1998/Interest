var fs = require('fs');
var getFollowMsg = function( db, u_id, callback) {
	var sql = 'SELECT mgstable.*,usertable.u_name,usertable.path FROM mgstable,usertable WHERE mgstable.u_id = usertable.id AND mgstable.u_id IN (SELECT star FROM foltable WHERE fans = ?)';
	db.query(sql, [u_id], function(err, data) {
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

module.exports = getFollowMsg;