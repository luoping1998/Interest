var getFollowMsg = function( db, u_id, callback) {
	var sql = 'SELECT mgstable.mgsid,mgstable.content,mgstable.u_id,mgstable.date,mgstable.Lnum,mgstable.Cnum,mgstable.Snum,usertable.u_name FROM mgstable,usertable WHERE mgstable.u_id = usertable.id AND mgstable.u_id IN (SELECT star FROM foltable WHERE fans = ?)';
	db.query(sql, [u_id], function(err, data) {
		// console.log(sql,err);
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

module.exports = getFollowMsg;