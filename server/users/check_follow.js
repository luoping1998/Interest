//检查是否关注
var checkFollow = function(db, star, fans, callback) {
	var sql = 'SELECT `f_id` FROM `foltable` WHERE `star` = ' + star +' AND `fans` = ' + fans ;
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

module.exports = checkFollow;