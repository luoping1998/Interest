const express = require('express');
var router = express.Router();

//发邮箱
var nodeMailer = require('nodemailer');
var mailTransport = nodeMailer.createTransport({
		"domains": [
 			"qq.com"
 		],
 		"host": "smtp.qq.com",
 		"port": 465,
 		"secure": true,
		"auth" : {
			user : '632694871@qq.com',
			pass : 'kzogddsotckzbehc'
		}
});

var mysql = require('mysql');
//创建和数据库的链接
var db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456',
	database : 'share',
	multipleStatements: true		//设置属性为true 允许执行多条sql
});

var checkInfo = require('../users/check_idpass.js');
var login = require('../users/login.js');
var checkExist = require('../users/check_exist.js');
var addInfor = require('../users/add_info.js');

var searchFriends = require('../users/search_friends.js');
var getFriend = require('../users/get_info_byid.js');
var addFollow = require('../users/add_follow.js');
var checkFollow = require('../users/check_follow.js');

//发邮箱
var isLogin = require('../libs/isLogin.js');
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
						// console.log(result);
						if(result.error) {
							res.send(result);
						}else {
							console.log('login success');
							req.session.user = result.infor;
							res.cookie('user',result.infor ,{ maxAge :20*60*1000, signed : true});
							res.send(result);
						}
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

//用户注册->获取验证码
router.use('/vcode', function(req, res) {
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
				html : '<h4>您的验证码为 ：' + vercode +', 请及时输入,验证码将在发送后3分钟以后失效。</h3>'
			};
			sendMail(mailTransport, options, function(mailRes) {
				console.log(mailRes);
				if(mailRes.error){
					res.send(mailRes);
				}else {
					req.session.vcode = {
						vc :vercode,
						date : Date.now()
					}
					res.send({
						'error':false,
						'result' : 'vcode sended'
					});
				}
			})
		}
	});
})

//带验证码注册
router.use('/reg', function(req, res) {
	var date = Date.now() - req.session.vcode.date;
	var infor = {
		'email': req.body.email,
		'name' : req.body.name,
		'pass' : req.body.pass,
		'vcode' : req.body.vcode
	}
	checkExist( db, infor.email, infor.name, function(result) {
		if(result.error) {
			res.send(result);
		}else {
			if(infor.vcode === req.session.vcode.vc && date <= 3*60*1000) {
				req.session.vcode = null;
				addInfor( db, infor.email, infor.name, infor.pass, function(data){
					console.log(data);
					res.send(data);
				});
			}else {
				if(infor.vcode !== req.session.vcode.vc) {
					req.session.vcode = null;
					res.send({
						'error' : true,
						'result' : 'vcode error'
					})
				}else {
					req.session.vcode = null;
					res.send({
						'error' : true,
						'result' : 'time out'
					})
				}
			}
		}
	})
})

//是否登录
router.use('/logif', function(req,res) {
	if(isLogin(req)){
		req.session.cookie.expires= new Date(Date.now() + 20 * 60 * 1000);
        res.send({
        	'error':false,
        	'result' : 'has login',
        	'infor' : req.session.user
        });
	}else{
    	res.send({
    		'error' : true,
    		'result' : 'not login'
    	})
    }
})

//退出登录
router.use('/out', function(req,res) {
	if(isLogin(req)) {
		req.session.destroy();
		res.send({
			'error' : false,
			'result' : 'log out success'
		})
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		})
	}
})


/* 以下为用户之间的互动 */
//检查是否关注
router.use('/chfollow', function (req, res) {
	if(isLogin(req)){
		var fans = req.query.fans;
		var star = req.query.star;
		checkFollow(db, star, fans, function (data){
			res.send(data)
		});
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		});
	}
})

//关键字查询好友
router.use('/search', function(req, res) {
	if(isLogin(req)) {
		var val = req.query.val;
		searchFriends(db,val,function(data) {
			res.send(JSON.parse(JSON.stringify(data)));
		})
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		})
	}
})

//按照id查看好友详细信息
router.use('/friend', function(req, res) {
	getFriend(db, req.query.id, function (data) {
		res.send(data);
	})
})

//粉某人
router.use('/follow', function(req, res) {
	if(isLogin(req)) {
		var fans = req.query.fans;
		var star = req.query.star;
		checkFollow(db, star, fans, function (data){
			console.log(data);
			if(data.result.length === 0) {
			//未关注
				addFollow(db, star, fans,function (data) {
					res.send(data);
				})
			}else {
				res.send({
					'error' : true,
					'result' : 'has followed'
				})
			}
		});
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		})
	}
})

module.exports = router;