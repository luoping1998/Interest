//搜索好友
var fs = require('fs');
var searchFriends = function(db, val, callback) {
	var reg = /^[0-9]+.?[0-9]*$/;
	var sql = '';
	var path = './static/pic/';
	if(val) {
		if(reg.test(val)) {
			sql = 'SELECT `id`,`u_name`,`signature`,`u_level`,`path`,`sex`,`show` from usertable WHERE `id` = ' + val +' OR `u_name` LIKE \'' + val +'%\' OR `email` LIKE \'' + val +'%\''; 
		} else {
			sql = 'SELECT `id`,`u_name`,`signature`,`u_level`,`path`,`sex`,`show` from usertable WHERE `u_name` LIKE \'' + val +'%\' OR `email` LIKE \'' + val +'%\''; 
		}
		db.query(sql, function(err, data) {
			// console.log(sql);
			if(err) {
				// console.log(err);
				callback({
					'error' : true,
					'result' : '数据库出错'
				})
			}else {
				var info = JSON.parse(JSON.stringify(data));
				var i,len = info.length;
				var pics = [];
				for(i = 0; i < len; i ++) {
					pics.push("data:image/png;base64,"+fs.readFileSync('./static/pic/'+info[i].path).toString("base64"));
				}				
				callback({
					'error' : false,
					'result' : info,
					'pics' : pics
				})
			}
		})
	}else {
		callback({
			'error' : false,
			'msg' : '好友不存在(╥╯^╰╥)'
		})
	}
	
}

module.exports = searchFriends;