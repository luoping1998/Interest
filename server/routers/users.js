// var multipart = require('connect-multiparty')();
var multer = require('multer');
var upload = multer({dest : './static/pic'});

var fs = require('fs');
const express = require('express');
var router = express.Router();

//发邮箱
var nodeMailer = require('nodemailer');
var mailTransport = 



nodeMailer.createTransport({
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

var db = require('../mysql/db.js');

var checkInfo = require('../users/check_idpass.js');		//查询密码
var login = require('../users/login.js');					//登录返回信息
var checkExist = require('../users/check_exist.js');		//查询用户是否存在
var addInfor = require('../users/add_info.js');				//添加信息至数据库
var changePhoto = require('../users/change_photo.js');		//修改头像
var saveInfor = require('../users/save_infor.js');			//保存信息

var searchFriends = require('../users/search_friends.js');		//粗略查询好友
var getFriend = require('../users/get_info_byid.js');			//按照id寻找好友
var addFollow = require('../users/add_follow.js');					//添加关注
var unFollow = require('../users/unfollow.js');					//取消关注
var checkFollow = require('../users/check_follow.js');			//检查是否关注

//发邮箱
var sendMail = require('../libs/sendEmails.js');
var isLogin = require('../libs/isLogin.js');

var vercode = '';		//验证码

//用户登录
router.post('/log', function(req, res) {
//核实用户登录信息
	var data = null;
	var result = {};
	var email = req.body.email;
	var pass = req.body.pass;
	var name = req.body.name;
	var path = '',base64 ;
	checkInfo(db, email, name, pass,function(data) {
		if(data.error) {
			res.send(data);
		}else{
			if(data.result.length === 0){
				res.send({
					'error' : true,
					'result' : '用户不存在'
				})
			}else {
				if(data.result[0].pass === pass){
					login(db, email, name ,function(result) {
						// console.log(result);
						if(result.error) {
							res.send(result);
						}else {
							// console.log('login success');
							req.session.user = result.infor;
							res.cookie('user',result.infor ,{ maxAge :20*60*1000, signed : true});
							// fs.readFile(result.infor.path, 'utf-8', function(err, cont) {
								res.send(result);
							// })
							
						}
					});
				}else {
					res.send({
						'error' : true,
						'result' : '密码错误'
					})
				}
			}
			
		}
	});
})

//用户注册->获取验证码
router.post('/vcode', function(req, res) {
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
				// console.log(mailRes);
				if(mailRes.error){
					res.send(mailRes);
				}else {
					req.session.vcode = {
						vc :vercode,
						date : Date.now()
					}
					res.send({
						'error':false,
						'result' : '验证码已发送'
					});
				}
			})
		}
	});
})

//带验证码注册
router.post('/reg', function(req, res) {
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
					res.send(data);
				});
			}else {
				if(infor.vcode !== req.session.vcode.vc) {
					req.session.vcode = null;
					res.send({
						'error' : true,
						'result' : '验证码错误'
					})
				}else {
					req.session.vcode = null;
					res.send({
						'error' : true,
						'result' : '验证码填写超时'
					})
				}
			}
		}
	})
})

//是否登录
router.get('/logif', function(req,res) {
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
    		'result' : '用户未登录'
    	})
    }
})

//退出登录
router.get('/out', function(req,res) {
	if(isLogin(req)) {
		req.session.destroy();
		res.send({
			'error' : false,
			'result' : '退出成功'
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//修改头像
router.post('/pho', upload.single('file'), function (req, res) {
	if(isLogin(req)) {
		var id = req.session.user.id;
		var npath = 'pics'+req.session.user.id;
		fs.rename('./static/pic/'+req.file.filename, './static/pic/' + npath,function(err) {
			if(err) {
				console.log(err);
			}else {
				changePhoto(db,id,npath,function(data) {
					res.send(data);
				});	
			}
		})
		
	}else {
		res.send({
			'error' : true,
			'result' : '您还没有登录呢'
		})
	}
})

//修改个人信息
router.post('/save', function( req, res) {
	// console.log(req.body);
	if(isLogin(req)) {
		saveInfor(db,req.body,function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
	
});

/* 以下为用户之间的互动 */
//检查是否关注
router.get('/chfollow', function (req, res) {
	if(isLogin(req)){
		var fans = req.session.user.id;
		var star = req.query.star;
		checkFollow(db, star, fans, function (data){
			res.send(data)
		});
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		});
	}
})

//关键字查询好友
router.get('/search', function(req, res) {
	if(isLogin(req)) {
		var val = req.query.val;
		searchFriends(db,val,function(data) {
			res.send(JSON.parse(JSON.stringify(data)));
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//按照id查看好友详细信息
router.get('/friend', function(req, res) {
	getFriend(db, req.query.id, function (data) {
		res.send(data);
	})
})

//粉某人
router.get('/follow', function(req, res) {
	if(isLogin(req)) {
		var fans = req.session.user.id;
		var star = req.query.star;
		checkFollow(db, star, fans, function (data){
			// console.log(data);
			if(data.result.length === 0) {
			//未关注
				addFollow(db, star, fans,function (data) {
					res.send(data);
				})
			}else {
				res.send({
					'error' : true,
					'result' : '你已经关注过他了'
				})
			}
		});
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//取消关注
router.get('/unfollow', function(req, res) {
	// console.log('unfollow');
	if(isLogin(req)) {
		var fans = req.session.user.id;
		var star = req.query.star;
		unFollow(db, fans, star, function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})
module.exports = router;