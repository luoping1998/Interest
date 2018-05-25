var changePhoto = function(db,id,path,callback){
	var sql = 'UPDATE `usertable` SET `path` = \''+ path +'\' WHERE `id` = '+ id;	
	db.query(sql, function (err, data) {
		console.log(err,data);
		if(err) {
			callback({
				'error' : true,
				'result' : 'mysql error'
			})
		}else {
			callback({
				'error' : false,
				'result' : 'change photo success'
			})
		}
	})
};

module.exports = changePhoto;