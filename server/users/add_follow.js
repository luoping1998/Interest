var follow = function (db, star, fans, callback) {
	//sql语句有问题
	var isql = 'INSERT INTO `foltable` (`star`,`fans`) VALUES ('+ star +','+ fans +');';
	var epsql = 'UPDATE `usertable` SET `starnum` = `starnum` + 1 WHERE id = ' + fans + ';';
	var gpsql = 'UPDATE `usertable` SET `fansnum` = `fansnum` + 1 WHERE id = ' + star + ';';
	var sql = isql + epsql + gpsql;
	db.query( sql, function (err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : err,
				'msg' : 'follow fail'
			})
		}else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data)),
				'msg' : 'follow success'
			})
		}
	})
}

module.exports = follow;