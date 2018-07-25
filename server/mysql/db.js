let mysql = require('mysql');
const dbs = require('../libs/msl');
const decrypt = require('../libs/utils');

//创建和数据库的链接
const db = mysql.createPool({
	host : decrypt(dbs.host),
	user : 'root',
	password : decrypt(dbs.pass),
	database : 'share',
	multipleStatements: true		//设置属性为true 允许执行多条sql
});

module.exports = db;