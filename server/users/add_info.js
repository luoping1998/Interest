var addInfo = function( db, email, name, pass ,callback) {
	var str = 'INSERT INTO `usertable` (`email`,`u_name`, `pass`, `u_level`, `msgnum`, `starnum` ,`fansnum`, `signature`) VALUES (' +'\''+email +'\'' + ',\'' + name  + '\',' + '\'' + pass +'\',' +' 0, 0, 0 ,0 ,\'' + 'ヽ(￣ω￣(￣ω￣〃)ゝ一起去抓水母吧~' + '\')';
	var sinfo = 'SELECT `msgnum`,`email`,`id`,`u_name`,`u_level`,`starnum`,`fansnum`,`signature` FROM `usertable` WHERE `u_name` = ' + '\'' + name + '\'';
	var result = null;
	db.query( str, function( err, data) {
		console.log(str,err,data);
		if(err) {
			result = {
				'error' : true,
				'result' : err
			}
		} else {
			db.query( sinfo, function(err,data){
				console.log(sinfo,err,data);
				if(err) {
					callback({
						'error' : true,
						'result' : err,
						'mgs' : 'sign up fail'
					});
				}else {
					callback({
						'error' : false,
						'result' : JSON.parse(JSON.stringify(data)),
						'mgs' : 'register success'
					});
				}
			});
		}
	})
}

module.exports = addInfo ;