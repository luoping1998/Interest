var searchFriends = function(db, val, callback) {
	var sql = 'SELECT `id`,`u_name`,`email` from usertable WHERE `id` LIKE \'' + val +'% \' OR `u_name` LIKE \'' + val +'%\' OR `email` LIKE \'' + val +'%\''; 
	db.query(sql, function(err, data) {
		console.log(sql);
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

module.exports = searchFriends;