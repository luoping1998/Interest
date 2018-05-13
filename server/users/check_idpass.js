var checkIdPass = function( db, email, name, pass, callback) {
	var sem = 'SELECT `pass` FROM `usertable` WHERE `email` = \'' + email + '\'';
	var sna = 'SELECT `pass` FROM `usertable` WHERE `u_name` = \'' + name + '\'';
	// var sna = 'SELECT `pass` FROM `usertable` WHERE `u_name ` = ' +'\'' +name +'\'';
	var str;
	if(email) str = sem;
	else str = sna;
	db.query( str, function( err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' : err
			})
		} else {
			callback({
				'error' : false,
				'result' : JSON.parse(JSON.stringify(data))
			})
		}
	})
}

module.exports = checkIdPass;