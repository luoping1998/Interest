const express = require('express');
var router = express.Router();

var mysql = require('mysql');
//创建和数据库的链接
var db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'share',
	multipleStatements: true		//设置属性为true 允许执行多条sql
});

var addMsg = require('../msgs/add_msg.js');

var isLogin = require('../libs/isLogin.js');

//发贴
router.use('/send', function(req, res) {
	//用户登录
	if(isLogin(req)) {
		//先对msg进行检测
		if(isLogin(req)) {
			var id = req.query.id;
			var content = req.query.content;
			var data = {};
			addMsg(db, id, content, function(data) {
				console.log(data);
				res.send(data);
			})
		}else {
			res.send({
				'error' : true,
				'result' : 'not login'
			})
		}
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		});
	}		
})

module.exports = router;