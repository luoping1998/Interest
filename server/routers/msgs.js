var multer = require('multer');
var upload = multer({dest : './static/imgs'});

const express = require('express');
var router = express.Router();

var db = require('../mysql/db.js');

var checkExist = require('../msgs/check_exist.js');				//检查帖子是否存在
var addMsg = require('../msgs/add_msg.js');						//发帖
var delMsg = require('../msgs/del_msg.js');						//删帖
var getMsgById = require('../msgs/get_msgby_id.js');			//查询用户id发过的帖
var getFollowMsg = require('../msgs/get_follow_msgs.js');		//查询关注好友的帖
var getNew = require('../msgs/get_new.js');						//获得最新帖
var getHot = require('../msgs/get_hot.js');						//获得最热帖
var getDetails = require('../msgs/get_msg_details.js');			//获得帖详情
var trasmit = require('../msgs/trasmit.js');					//转发帖子
var getUserMsg = require('../msgs/get_user_msg.js');			//获取好友发表帖

//检测是否登录
var isLogin = require('../libs/isLogin.js');

//获取好友发表的帖
router.get('/u_msg',function(req, res) {
	getUserMsg(db, req.query.u_id, function(data) {
		res.send(data);
	})
})

//发贴
router.post('/send', upload.any(), function(req, res) {
	//用户登录
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		//先对msg进行检测
		var len = req.files.length;
		var id = req.session.user.id;
		var infor = JSON.parse(req.body.infor)
		var content = infor.content;
		var title = infor.title;
		var imgs = ''
		for(var i = 0; i < len; i ++) {
			imgs = imgs + req.files[i].filename + '!';
		}
		
		addMsg(db, id, content, title, imgs, function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : 'not login'
		});
	}		
})

//删帖
router.get('/del', function(req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		var id = req.session.user.id;
		var m_id = req.query.m_id;
		checkExist(db, id, m_id, function(data) {
			if(data.error) {
				res.send(data);
			}else {
				delMsg(db, id, m_id, function(data) {
					res.send(data);
				})
			}
		})
	}else{
		res.send({
			'error' : true,
			'result' : 'not login'
		})
	}
})

//获取id发表的所有帖子
router.get('/get_msg', function(req, res) {
	//用户登录
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		getMsgById(db, req.session.user.id, function(data) {
			res.send(data);
		})
	}else {	
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//获取用户id关注人的帖子
router.get('/getfmsg', function(req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		getFollowMsg(db, req.session.user.id, req.query.start, function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//获取世界最新帖
router.get('/wnew', function(req, res) {
	// console.log(req.query);
	getNew(db, req.query.start, function(data) {
		res.send(data);
	});
})

//获取最近最热帖
router.get('/whot', function(req, res) {
	getHot(db, function(data) {

	});
})

//获得帖详情
router.get('/details', function(req, res) {
	getDetails(db, req.query.id, req.query.type, function(data) {
		res.send(data);
	})
})

//转发帖子
router.get('/trasmit', function(req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		trasmit(db, req.session.user.id, req.query.m_id, req.query.title, function(data) {
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