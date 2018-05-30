var fs = require('fs');
var changePhoto = function(db,id,path,callback){
	var sql = 'UPDATE `usertable` SET `path` = \''+ path +'\' WHERE `id` = '+ id;	
	var path = './static/pic/' + path;
	db.query(sql, function (err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else {
			fs.readFile(path,function (err,cont) {
				callback({
					'error' : false,
					'result' : 'change photo success',
					'pic' : 'data:image/png;base64,'+cont.toString("base64"),
				})
			})
			
		}
	})
};

module.exports = changePhoto;