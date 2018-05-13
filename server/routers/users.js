const express = require('express');
var router = express.Router();

var nodeMailer = require('nodemailer');
var mailTransport = nodeMailer.createTransport({
		host : 'smtp.qq.com',
		secureConnection : true,
		auth : {
			user : '632694871@qq.com',
			pass : 'kzogddsotckzbehc'
		}
});

var mysql = require('mysql');
//创建和数据库的链接
var db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'luo...1998ping',
	database : 'share'
});

var checkInfo = require('../users/check_idpass.js');
var login = require('../users/login.js');
var checkExist = require('../users/check_exist.js');
var addInfor = require('../users/add_info.js');
var addMsg = require('../users/add_msg.js');

//发邮箱
var sendMail = require('../libs/sendEmails.js');
var vercode = '';		//验证码

//用户登录
router.use('/log', function(req, res) {
//核实用户登录信息
	var data = null;
	var result = {};
	var email = req.body.email;
	var pass = req.body.pass;
	var name = req.body.name;
	// console.log(id,pass);
	checkInfo(db, email, name, pass,function(data) {
		if(data.error) {
			res.send(data);
		}else{
			if(data.result.length === 0){
				res.send({
					'error' : true,
					'result' : 'user not exist'
				})
			}else {
				if(data.result[0].pass === pass){
					login(db, email, name ,function(result) {
						res.send(result);
					});
				}else {
					res.send({
						'error' : true,
						'result' : 'password error'
					})
				}
			}
			
		}
	});
})

//用户注册
router.use('/reg', function(req, res) {
	//核实用户名是否存在
	var result = null;
	var data = null;
	var options = {};
	var email = req.body.email;
	var name = req.body.name;
	//检查邮箱和用户名是否存在
	checkExist( db, email, name, function(result) {
		if(result.error) {
			res.send(result);
		}else {
			vercode = '';
			for(var i = 0; i < 6; i ++) {
				vercode = vercode + parseInt(Math.random()*10);
			}
			options = {
				from : '632694871@qq.com',
				to : email,
				subject : '验证码',
				text : '验证码',
				html : '<h3>您的验证码为 ：' + vercode +', 请及时输入,验证码将在发送后一小时以后失效。</h3>'
			};
			sendMail(mailTransport, options, function(mailRes) {
				if(mailRes.error){
					res.send(mailRes);
				}else {
					//检测验证码，验证码页面 :访问/vcode
					//正确：成功注册
					//失败：返回失败信息
				}
			})
		}
	});
})

router.use('/vcode', function(req, res) {
	var res = req.query.vcode;
	var infor = {
		'email': req.query.email,
		'name' : req.query.name,
		'pass' : req.query.pass
	}
	if(re === vercode) {
		res.send({
			'error' : false,
			'result' : 'vercode is right'
		})
	}else {
	// addInfor( db, infor.email, infor.name, infor.pass, function(data){
		//res.send(data);
	//});
	}
})

router.use('/send', function(req, res) {
	//先对msg进行检测
	var id = req.query.id;
	var content = req.query.content;
	var data = {};
	addMsg(db, id, content, function(data) {
		console.log(data);
		res.send(data);
	})
})

module.exports = router;