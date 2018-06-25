//保存修改
var saveInfor = function(db, infor, callback) {
	var sql = 'UPDATE `usertable` SET `u_name` = ?, `signature` = ?,`sex` = ?,`show`= ?  WHERE id = ?';
	db.query(sql,[infor.u_name, infor.signature, infor.sex, infor.show, infor.id], function( err, data) {
		console.log(err,data);
		if(err){
			callback({
				'error' : true,
				'msg' : '数据库出错'
			})
		}else {
			callback({
				'error' : false,
				'msg' : '修改资料成功',
				'infor' : infor
			})
		}
	})
}
module.exports = saveInfor;