var checkExist = function( db, email, name, callback) {
	var str = 'SELECT `id` FROM `usertable` WHERE `email` = ' + '\'' + email + '\'';
	db.query( str, function( err, data) {
		if(data.length===0) {
			var sna = 'SELECT `id` FROM `usertable` WHERE `u_name` = ' + '\'' + name +'\'';
			db.query(sna, function (err, data) {
				if(data.length === 0) {
					callback({
						'error' : false,
						'result' : 'prepare to registe'
					})
				}else {
					callback({
						'error' : true,
						'result' : 'username exists'
					})
				}
			})
		} else {
			callback({
				'error' : true,
				'result' : 'email exists'
			})
		}
	})
}

module.exports = checkExist;