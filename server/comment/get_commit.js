var fs = require('fs');
var Getcommit = function(db, c_id, callback) {
	var sql = 'SELECT critable.*,usertable.u_name, usertable.path FROM critable,usertable WHERE c_id = ? AND usertable.id = critable.from_id';
	db.query(sql, [c_id], function(err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' :true,
				'result' : '数据库出错'
			})
		}else {
			infor =  JSON.parse(JSON.stringify(data))[0];
			var path = './static/pic/' + infor.path;
			fs.readFile(path, function(err,cont) {
				callback({
					'error' : false,
					'infor' : infor,
					'pic' : 'data:image/png;base64,'+cont.toString("base64")
				});
			})
		}
	})
}
module.exports = Getcommit;