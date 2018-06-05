var addInfo = function( db, email, name, pass ,callback) {
	var str = 'INSERT INTO `usertable` (`email`,`u_name`, `pass`, `u_level`, `msgnum`, `starnum` ,`fansnum`, `signature`,`path`) VALUES (' +'\''+email +'\'' + ',\'' + name  + '\',' + '\'' + pass +'\',' +' 0, 0, 0 ,0 ,\'' + 'ヽ(￣ω￣(￣ω￣〃)ゝ一起去抓水母吧~ \',\'default\')';
	var sinfo = 'SELECT `msgnum`,`email`,`id`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` FROM `usertable` WHERE `u_name` = ' + '\'' + name + '\'';
	var result = null;
	db.query( str, function( err, data) {
		if(err) {
			result = {
				'error' : true,
				'result' : err
			}
		} else {
			db.query( sinfo, function(err,data){
				// console.log(sinfo,err,data);
				if(err) {
					callback({
						'error' : true,
						'result' : err,
						'mgs' : '注册失败'
					});
				}else {
					callback({
						'error' : false,
						'result' : JSON.parse(JSON.stringify(data)),
						'mgs' : '注册成功'
					});
				}
			});
		}
	})
}

module.exports = addInfo ;