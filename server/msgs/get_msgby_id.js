//查找用户id发表过的帖子
var fs = require('fs');
var getMsgById = function(db, u_id, callback) {
	var sql = 'SELECT mgstable.*,usertable.u_name,usertable.path FROM `mgstable`,`usertable` WHERE mgstable.u_id = ? AND usertable.id = ?';
	db.query(sql, [u_id,u_id],function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var result = JSON.parse(JSON.stringify(data));
			var len = result.length;
			var imgs = [];
			for(var i = 0; i < len; i ++) {
				var simg = [];
				if(result[i].imgs) {
					var arr = result[i].imgs.split('!');
					console.log(arr);
					var slen = arr.length;
					for(var j = 0; j < slen-1; j ++) {
						var data = 'data:image/png;base64,'+ fs.readFileSync('./static/imgs/'+arr[j]).toString("base64");
						simg.push(data);
					}
				}
				imgs.push(simg);
			}
			
			callback({
				'error' : false,
				'result' : result,
				'imgs' : imgs
			})
		}
	})
}

module.exports = getMsgById;