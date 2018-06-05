var fs = require('fs');
var changePhoto = function(db,id,path,callback){
	var sql = 'UPDATE `usertable` SET `path` = \''+ path +'\' WHERE `id` = '+ id;	
	var path = './static/pic/' + path;
	db.query(sql, function (err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			// console.log(path);
			fs.readFile(path,function (err,cont) {
				callback({
					'error' : false,
					'result' : '修改头像成功',
					'pic' : 'data:image/png;base64,'+cont.toString("base64"),
				})
			})
			
		}
	})
};

module.exports = changePhoto;