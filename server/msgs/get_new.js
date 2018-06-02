//获取最新的帖子
var getNew = function(db, start, callback) {
	var sql = 'SELECT mgstable.*, usertable.u_name FROM `mgstable` LEFT JOIN `usertable` on mgstable.u_id = usertable.id AND mgstable.type = 0 ORDER BY mgstable.date DESC LIMIT ?,?';
	db.query(sql, [start-0, start-0+10], function(err, data) {
		// console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = getNew;