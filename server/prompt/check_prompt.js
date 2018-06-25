var fs = require('fs');
var checkPrompt = function(db, u_id, callback) {
	db.query('SELECT * FROM prompt WHERE puser = ?', [u_id], function(err, data) {
		// console.log(err,data);
		var mes = null;
		if(err) {
			mes = {
				'error' : true,
				'result' :'数据库出错'
			};
		}else {
			mes = {
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data)),
				'hasnew' : (data.length ? true : false)
			}
		}
		fs.write('../static/'+u_id, JSON.stringify(mes), function(err, data) {
			if(err) {
				callback({
					'error' : true,
					'result' : '读取文件失败'
				})
			}else {
				callback(mes);
			}
		})

	})
}

module.exports = checkPrompt;