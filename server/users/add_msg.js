var addMsg = function( db, id, content, callback) {
	var	str = 'INSERT INTO `mgstable` (`u_id`,`content`,`Lnum`,`Snum`,`Cnum`) VALUES (' + id +',\'' + content +'\', 0, 0, 0)';
	db.query(str , function( err, data) {
		if(err) {
			callback({
				'error' : true,
				'result' :err
			});
		}else{
			callback({
				'error' : false,
				'result' :JSON.parse(JSON.stringify(data)),
				'mgs' : 'send mgs success'
			})
		}
	})
}

module.exports = addMsg ;