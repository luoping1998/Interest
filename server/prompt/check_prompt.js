var fs = require('fs');
var checkPrompt = function(db, u_id, callback) {
	db.query('SELECT COUNT(status) as count FROM prompt WHERE `status` = 0 AND puser = ?;', [u_id], function(err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' :'数据库出错'
			});
		}else {
			var num = JSON.parse(JSON.stringify(data))[0].count;
			db.query('SELECT prompt.*, usertable.path FROM prompt,usertable WHERE prompt.puser = ? AND usertable.id = prompt.u_id order by date DESC', [u_id], function(err, data) {
				var mes = JSON.parse(JSON.stringify(data));
				if(err) {
					callback({
						'error' : true,
						'result' :'数据库出错'
					});
				}else {
					var i,len = mes.length;
					var pics = [];
					for(i = 0; i < len; i ++) {
						pics.push("data:image/png;base64,"+fs.readFileSync('./static/pic/'+mes[i].path).toString("base64"));
					}
					console.log((num > 0 ? true : false));		
					callback({
						'error' : false,
						'result' : mes,
						'pics' : pics,
						'hasnew' : (num > 0 ? true : false)
					})
				}
			})
		}
	})
	
}

module.exports = checkPrompt;