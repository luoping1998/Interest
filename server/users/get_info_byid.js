var getFriend = function (db, id, callback) {
	var sql = 'SELECT `id`,`email`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` , `msgnum` FROM `usertable` WHERE `id` =' + id;
	db.query(sql, function(err,data) {
		if(err) {
			callback({
				'error' : true,
				'result' : err
			})
		}else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = getFriend;