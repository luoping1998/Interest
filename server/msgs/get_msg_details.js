//获得帖子的细节
var fs = require('fs');
var getDetails = function(db, m_id, callback) {
	var sql = 'SELECT mgstable.*, usertable.u_name, usertable.path FROM mgstable, usertable WHERE mgstable.mgsid = ? and mgstable.u_id = usertable.id;'
	db.query(sql, [m_id-0], function(err, data) {
		// console.log(err, data);
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			// console.log(info);
			fs.readFile('./static/pic/' + info[0].path, function(err, cont) {
				if(err) {
					callback({
						'error' : true,
						'result' : 'fs error'
					})
				}else {
					callback({
						'error' : false,
						'result' : info,
						'pic' : 'data:image/png;base64,'+cont.toString("base64")
					})
				}
			})
		}
	})
}
module.exports = getDetails;