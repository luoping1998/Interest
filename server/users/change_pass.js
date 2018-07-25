var changePass = function(db, pass, email, callback) {
	db.query('UPDATE `usertable` SET `pass` = ? WHERE `email` = ?', [pass, email], function(err,data) {
		if(err) {
			console.log(err);
			callback({
				'error' : true,
				'result' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'result' : '修改密码成功' 
			})
		}
	})
}

module.exports = changePass;