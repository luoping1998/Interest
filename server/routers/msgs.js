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

//检测是否登录
var isLogin = require('../libs/isLogin.js');

//发贴
router.post('/send', function(req, res) {
	//用户登录
	if(isLogin(req)) {
		//先对msg进行检测
		// if(isLogin(req)) {
			var id = req.body.u_id;
			var content = req.body.content;
			var data = {};
			addMsg(db, id, content, function(data) {
				console.log(data);
				res.send(data);
			})
		// }else {
			// res.send({
				// 'error' : true,
				// 'result' : 'messages ilegal'
			// })
		// }
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
		getMsgById(db, req.query.id, function(data) {
			// console.log(data);
			res.send(data);
		})
	}else {	
		res.send({
			'error' : true,
			'result' : 'not login'
		})
	}
})

//获取用户id关注人的帖子
router.get('/getfmsg', function(req, res) {
	if(isLogin(req)) {
		getFollowMsg(db, req.query.u_id, function(data) {
			res.send(data);
		})
	}
})

//获取世界最新帖
router.get('/wnew', function(req, res) {
	console.log(req.query);
	getNew(db, req.query.start, function(data) {
		res.send(data);
	});
})

//获取最近最热帖
router.get('/whot', function(req, res) {
	getHot(db, function(data) {

	});
})
module.exports = router;