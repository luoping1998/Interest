//获取最新的帖子
var fs = require('fs');
var getNew = function(db, start, callback) {
	var sql = 'SELECT mgstable.*, usertable.u_name, usertable.path FROM `mgstable` ,`usertable` WHERE mgstable.u_id = usertable.id AND mgstable.type = 0 ORDER BY mgstable.date DESC LIMIT ?,?';
	// console.log(start);
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

			var imgs = [];
			for(var i = 0; i < len; i ++) {
				var simg = [];
				if(info[i].imgs) {
					var arr = info[i].imgs.split('!');
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
				'result' : info,
				'pics' : pics,
				'imgs' : imgs
			})
		}
	})
}

module.exports = getNew;