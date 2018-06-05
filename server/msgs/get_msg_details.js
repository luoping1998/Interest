//获得帖子的细节
var fs = require('fs');
var Getcomments = require('../comment/get_comments.js');
var getDetails = function(db, m_id, callback) {
	var sql = 'SELECT mgstable.*, usertable.u_name, usertable.path FROM mgstable, usertable WHERE mgstable.mgsid = ? and mgstable.u_id = usertable.id;'
	db.query(sql, [m_id-0], function(err, data) {
		// console.log(err, data);
		if(err) {
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			// console.log(info);
			fs.readFile('./static/pic/' + info[0].path, function(err, cont) {
				if(err) {
					callback({
						'error' : true,
						'result' : '头像读取出错'
					})
				}else {
					Getcomments(db, m_id, function(data) {
						callback({
							'error' : false,
							'result' : info,
							'pic' : 'data:image/png;base64,'+cont.toString("base64"),
							'comments' : data
						})
					})
					
				}
			})
		}
	})
}
module.exports = getDetails;