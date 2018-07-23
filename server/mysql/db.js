var mysql = require('mysql');
//创建和数据库的链接
var db = mysql.createPool({
	host : '139.199.205.91',
	user : 'root',
	password : 'luo...1998PING',
	database : 'share',
	multipleStatements: true		//设置属性为true 允许执行多条sql
});

module.exports = db;