const express = require('express');
var router = express.Router();

var db = require('../mysql/db.js');
var isLogin = require('../libs/isLogin.js');

var Addcomment = require('../comment/add_comment.js');			//发表评论
var Getcomments = require('../comment/get_comments.js');		//获得相关评论 热度
var Addlike = require('../comment/add_like.js');				//点赞
var Checklike = require('../comment/check_like.js');			//是否点过赞
var replyComment = require('../comment/reply.js');				//回复 
var Getreplys = require('../comment/getall_reply.js');			//获得评论回复
var Getcommit = require('../comment/get_commit.js');			//获取单条评论

//发表评论
router.get('/add', function(req, res) {
	if(isLogin(req)){
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		Addcomment(db, req.session.user.id, req.query.to, req.query.comment, req.query.m_id, function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
	
})

//获得评论
router.get('/get',function(req, res) {
	// console.log(req.query);
	Getcomments(db, req.query.m_id, req.query.type, function(data) {
		res.send(data);
	})
})

//点赞
router.get('/like',function(req, res) {
	if(isLogin(req)){
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		Checklike(db, req.query.m_id, req.session.user.id,function(data) {
			if(data.error) {
				res.send(data);
			}else{
				Addlike(db, req.query.m_id, req.session.user.id,function(data) {
					res.send(data);
				})
			}
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
	
})

//回复评论
router.get('/reply', function(req, res) {
	if(isLogin(req)) {
		res.cookie('user',req.session.user ,{ maxAge :20*60*1000, signed : true});
		replyComment(db, req.query.c_id, req.query.r_cont, req.session.user.id, function(data) {
			res.send(data);
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//获得评论的全部
router.get('/getdall',function(req, res) {
	// console.log(req.query);
	Getreplys(db, req.query.c_id, function(data) {
		res.send(data);
	})
})

//获得指定评论
router.get('/getone',function(req, res) {
	// console.log(req.query);
	Getcommit(db, req.query.c_id, function(data) {
		res.send(data);
	})
})
module.exports = router;