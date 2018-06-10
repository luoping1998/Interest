const express = require('express');
var router = express.Router();

var db = require('../mysql/db.js');
var isLogin = require('../libs/isLogin.js');

var Addcomment = require('../comment/add_comment.js');			//发表评论
var Getcomments = require('../comment/get_comments.js');		//获得相关评论
var Addlike = require('../comment/add_like.js');				//点赞
var Checklike = require('../comment/check_like.js');			//是否点过赞
var replyComment = require('../comment/reply.js');				//回复 

//发表评论
router.get('/add', function(req, res) {
	if(isLogin(req)){
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
	Getcomments(db, req.query.m_id, function(data) {
		res.send(data);
	})
})

//点赞
router.get('/like',function(req, res) {
	if(isLogin(req)){
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

module.exports = router;