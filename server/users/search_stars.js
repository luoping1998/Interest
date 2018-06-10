var fs = require('fs');
var searchStars = function(db, id, callback) {
	var sql = 'SELECT usertable.id, usertable.u_name, usertable.signature, usertable.path FROM usertable, foltable WHERE foltable.fans = ? AND usertable.id = foltable.star;'
	db.query(sql, [id], function(err, data) {
		// console.log(err, data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			var i,len = info.length;
			var pics = [];
			for(i = 0; i < len; i ++) {
				pics.push("data:image/png;base64," + fs.readFileSync('./static/pic/'+info[i].path).toString("base64"));
			}
			callback({
				'error' : false,
				'result' : info,
				'pics' : pics
			})
		}	
	})
}

module.exports = searchStars;