//加关注
var addPromp = require('../libs/addPromp.js');
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
				'msg' : '关注失败'
			})
		}else {
			var info = JSON.parse(JSON.stringify(data));
			db.query('SELECT u_name FROM usertable WHERE id = ?',[fans], function(err, data) {
				if(err) {
					callback({
						'error' : true,
						'result' : '数据库出错'
					})
				}else {
					var fname = JSON.parse(JSON.stringify(data))[0].u_name;
					var cont = '关注了你'; 
					var str = 'INSERT INTO prompt (u_id, puser, p_type, uname, t_id) VALUES(?,?,?,?,?)';
					
					var args = [fans, star, cont, fname, 0];
					addPromp(db, str, args, function(data) {
						if(data.error) {
							callback(data);
						}else {
							callback({
								'error' : false,
								'result' : info,
								'msg' : '关注成功'
							})
						}
					})
				}
			})
		}
	})
}

module.exports = follow;