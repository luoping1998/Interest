var mysql = require('mysql');
//创建和数据库的链接
var db = mysql.createPool({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'share',
	multipleStatements: true		//设置属性为true 允许执行多条sql
});

module.exports = db;