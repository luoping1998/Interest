//保存修改
var saveInfor = function(db, infor, callback) {
	var sql = 'UPDATE `usertable` SET `u_name` = \'' + infor.u_name +'\',`signature` = \'' + infor.signature + '\',`sex` = \'' + infor.sex +'\' WHERE id = ' + infor.id;
	db.query(sql, function( err, data) {
		// console.log(err);
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