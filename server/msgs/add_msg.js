var fs = require('fs');
var addMsg = function( db, id, content, callback) {
	var	str = 'INSERT INTO `mgstable` (`u_id`,`content`,`Lnum`,`Snum`,`Cnum`) VALUES (' + id +',\'' + content +'\', 0, 0, 0)';
	var path = './static/pic/';
	db.query(str , function( err, data) {
		var infor = JSON.parse(JSON.stringify(data));
		if(err) {
			callback({
				'error' : true,
				'result' :err
			});
		}else{
			path = path + infor.path;
			fs.readFile(path,function (err,cont) {
				callback({
					'error' : false,
					'result' :infor,
					'pic' : cont,
					'mgs' : 'send mgs success'
				})
			})
			
		}
	})
}

module.exports = addMsg ;