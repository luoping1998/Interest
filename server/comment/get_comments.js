var fs = require('fs');
var Getcomments = function(db, m_id, type, callback){
	var sql = 'SELECT critable.* , usertable.u_name, usertable.path FROM critable,usertable WHERE usertable.id = critable.from_id AND critable.m_id = ? order by critable.reply desc';
	if(type == 0) {
	sql = 'SELECT critable.* , usertable.u_name, usertable.path FROM critable,usertable WHERE usertable.id = critable.from_id AND critable.m_id = ? order by critable.date desc';
	}
	db.query(sql, [m_id], function(err, data) {
		if(err) { 
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else{
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
module.exports = Getcomments;