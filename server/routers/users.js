// var multipart = require('connect-multiparty')();
let multer = require('multer');
let upload = multer({dest : './static/pic'});

let fs = require('fs');
const express = require('express');
let router = express.Router();

//发邮箱
let nodeMailer = require('nodemailer');
let mailTransport = nodeMailer.createTransport({
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

const decrypt = require('../libs/utils');
const keys = require('../libs/keys');

let db = require('../mysql/db.js');

let checkInfo = require('../users/check_idpass.js');		//查询密码
let login = require('../users/login.js');					//登录返回信息
let checkExist = require('../users/check_exist.js');		//查询用户是否存在
let checkSame = require('../users/check_same.js');			//检测是否存在用户且信息匹配
let changePass = require('../users/change_pass.js');		//修改密码
let addInfor = require('../users/add_info.js');				//添加信息至数据库
let changePhoto = require('../users/change_photo.js');		//修改头像
let saveInfor = require('../users/save_infor.js');			//保存信息

let searchFriends = require('../users/search_friends.js');		//粗略查询好友
let getFriend = require('../users/get_info_byid.js');			//按照id寻找好友
let addFollow = require('../users/add_follow.js');				//添加关注
let unFollow = require('../users/unfollow.js');					//取消关注
let checkFollow = require('../users/check_follow.js');			//检查是否关注
let searchFans = require('../users/search_fans.js');			//查询粉丝
let searchStars = require('../users/search_stars.js');			//查询我关注的

//检测是否为有效邮箱
function isMail(mail) {
    var mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    if(!mailreg.test(mail)){
        return false;
    }else{
        return true;
    }
}

//发邮箱
let sendMail = require('../libs/sendEmails.js');
let isLogin = require('../libs/isLogin.js');

let vercode = '';		//验证码

//前端获取公钥
router.get('/key', (req, res) => {
    res.send({
      publicKey:keys.pubKey
    });
})

//用户登录
router.post('/log', function(req, res) {
//核实用户登录信息
	let data = null;
	let result = {};
	let pass = decrypt(req.body.pass);
	let email = req.body.email;
	let name = req.body.name;
	let path = '',base64 ;
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
				let spass = decrypt(data.result[0].pass);
				if(spass === pass){
					login(db, email, name ,function(result) {
						if(result.error) {
							res.send(result);
						}else {
							req.session.user = result.infor;
							res.cookie('user',result.infor ,{ maxAge :120*60*1000, signed : true});
							res.send(result);						
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
	let result = null;
	let data = null;
	let options = {};
	let email = req.body.email;
	let name = req.body.name;
	console.log(req.body);
	if(!isMail(email)){
		res.send({
			'error' : true,
			'result' : '邮箱不合法！'
		});
		return ;
	}
	//检查邮箱和用户名是否存在
	checkExist( db, email, name, function(result) {
		if(result.error) {
			res.send(result);
		}else {
			vercode = '';
			for(let i = 0; i < 6; i ++) {
				vercode = vercode + parseInt(Math.random()*10);
			}
			options = {
				from : '632694871@qq.com',
				to : email,
				subject : '验证码',
				text : '验证码',
				html : '<h4>您的验证码为 ：' + vercode +', 请及时输入,验证码将在发送后3分钟以后失效。</h4>'
			};
			sendMail(mailTransport, options, function(mailRes) {
				if(mailRes.error){
					res.send(mailRes);
				}else {
					req.session.vcode = {
						em : email,
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
	if(!req.session.vcode) {
		res.send({
			'error' : true,
			'result' : '请先获取验证码'
		})
		return ;
	}

	let date = Date.now() - req.session.vcode.date;

	let infor = {
		'email': req.session.vcode.em,
		'name' : req.body.name,
		'pass' : req.body.pass,
		'vcode' : req.body.vcode
	}

	if(!isMail(infor.email)){
		res.send({
			'error' : true,
			'result' : '邮箱不合法！'
		});
		return ;
	}
	
	checkExist( db, infor.email, infor.name, function(result) {
		if(result.error) {
			res.send(result);
		}else {
			if(infor.vcode === req.session.vcode.vc && date <= 3*60*1000) {
				req.session.vcode = null;
				let pass = infor.pass;
				addInfor( db, infor.email, infor.name, pass, function(data){
					res.send({
						'error' : false,
						'result' : '您使用邮箱 '+infor.email+' 注册成功啦！快去登录吧~'
					});
				});
			}else {
				if(infor.vcode !== req.session.vcode.vc) {
					res.send({
						'error' : true,
						'result' : '验证码错误'
					})
				}else {
					res.send({
						'error' : true,
						'result' : '验证码填写超时'
					})
				}
			}
		}
	})
})

//用户修改密码第一步->获取验证码
router.get('/code', function(req, res) {
	//核实用户名是否存在
	let result = null;
	let data = null;
	let options = {};
	let email = req.query.email;
	let name = req.query.name;
	
	//检查邮箱和用户名是否存在
	checkSame( db, email, name, function(result) {
		if(result.error) {
			res.send(result);
		}else {
			vercode = '';
			for(let i = 0; i < 6; i ++) {
				vercode = vercode + parseInt(Math.random()*10);
			}
			options = {
				from : '632694871@qq.com',
				to : email,
				subject : '修改密码',
				text : '验证码',
				html : '<h4>您正在修改您的密码，有效验证码为 ：' + vercode +', 请不要告诉其他人并及时输入,验证码将在发送后3分钟以后失效。</h4>'
			};
			sendMail(mailTransport, options, function(mailRes) {
				if(mailRes.error){
					res.send(mailRes);
				}else {
					req.session.vcode = {
						vc :vercode,
						em : email,
						date : Date.now()
					}
					res.send({
						'error':false,
						'result' : '验证码已发送到邮箱'
					});
				}
			})
		}
	});
})


//修改密码验证码验证
router.get('/check', function(req, res) {
	let date = Date.now() - req.session.vcode.date;
	if(req.query.vcode === req.session.vcode.vc && date <= 3*60*1000) {
		req.session.flag = {
			'email' : req.session.vcode.em,
			'checked' : true
		}
		req.session.vcode = null;
		res.send({
			'error' : false,
			'result' : '验证成功'
		})
	}else {
		if(req.qury.vcode !== req.session.vcode.vc) {
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
})

//修改密码
router.post('/cpass', function(req, res) {
	const promise = new Promise((resolve, reject)=>{
		if(!req.session.flag) {
			reject();
			return ;
		}
		resolve();
	}).then(()=>{
		if(req.session.flag) {
			changePass(db, req.body.pass, req.session.flag.email, function(data) {
				res.send(data);
			})
		}else {
			res.send({
				'error' : true,
				'result' : '用户未验证'
			})
		}
	}).catch(()=>{
		res.send({
			'error' : true,
			'result' : '用户未验证'
		})
	})
})

//是否登录
router.get('/logif', function(req,res) {
	if(isLogin(req)){
		req.session.cookie.expires = new Date(Date.now() + 120 * 60 * 1000);
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
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
		let id = req.session.user.id;
		let npath = 'pics'+req.session.user.id;
		fs.rename('./static/pic/'+req.file.filename, './static/pic/' + npath,function(err) {
			if(err) {
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
	if(isLogin(req)) {
		req.session.user = req.body
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
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
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
		let fans = req.session.user.id;
		let star = req.query.star;
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
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
		let val = req.query.val;
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
	console.log(req.query);
	getFriend(db, req.query.id, function (data) {
		res.send(data);
	})
})

//粉某人
router.get('/follow', function(req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
		let fans = req.session.user.id;
		let star = req.query.star;
		checkFollow(db, star, fans, function (data){
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
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
		let fans = req.session.user.id;
		let star = req.query.star;
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

//查询粉丝
router.get('/fans', function (req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
	}
	searchFans(db, req.query.id, function (data) {
		res.send(data);
	})
})

//查询我关注的
router.get('/stars', function (req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :120*60*1000, signed : true});
	}
	searchStars(db, req.query.id, function (data) {
		res.send(data);
	})
})


module.exports = router;