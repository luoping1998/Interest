var checkExist = function( db, email, name, callback) {
	let str = 'SELECT `id` FROM `usertable` WHERE `email` = ?';
	const promise = new Promise((resolve, reject) => {
		db.query( str, [email], function( err, data) {
			if(data.length===0) {
				resolve();
			} else {
				reject();
			}
		})
	}).then(res=>{
		let sna = 'SELECT `id` FROM `usertable` WHERE `u_name` = ?';
		db.query(sna, [name], function (err, data) {
			if(data.length === 0) {
				callback({
					'error' : false,
					'result' : '用户不存在'
				})
			}else {
				callback({
					'error' : true,
					'result' : '用户名已存在'
				})
			}
		})
	}).catch(err=>{
		callback({
			'error' : true,
			'result' : '邮箱已存在'
		})
	})
}

module.exports = checkExist;