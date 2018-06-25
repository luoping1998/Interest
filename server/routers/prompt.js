var db = require('../mysql/db.js');

var fs = require('fs');
const express = require('express');
var router = express.Router();

var isLogin = require('../libs/isLogin.js');

var checkPromp = require('../prompt/check_prompt.js');			//查询推送
var hasRead = require('../prompt/has_read_prompts.js');			//已阅读推送

var user = null;

//获取用户id
router.get('/id', (req, res) => {
	if(isLogin(req)) {
		user = req.session.user;
		res.send({
			'error' : false,
			'result' : '验证成功'
		})
	}else {
		res.send({
			'error' : true,
			'result' : '用户未登录'
		})
	}
})

//实时推送
router.get('/push', (req, res) => {
	var interval ;
	console.log('收到请求.');
	interval = setInterval(() => {
		console.log('登陆的门口.',req.session);
		if(user) {
			console.log('嗯 已登陆.');
			checkPromp(db, user.id, (data) => {
				if(data.hasnew) {
					fs.readFile('../static/' + user.id, function(err,data) {
						if(err) {
							res.write(`id: ${new Date()}\n`);
							res.write('data: error\n\n');
							res.write('retry: 10000\n');
							res.write('\n\n');
						}else {
							res.write(`id: ${new Date()}\n`);
							res.write('data: ' + cont + '\n\n');
							res.write('retry: 10000\n');
							res.write('\n\n');
						}
					})
				}
			})
			req.connection.addListener('close', () => {
				clearInterval(interval);
			},false);
		}else {
			clearInterval(interval);
			console.log('哦 没登陆.');
			var mes = {
				'error' : true,
				'result' : '用户未登录'
			};
			res.write(`id: ${new Date()}\n`);
			res.write('data: { \n');
			res.write('data: "error" : true \n');
			res.write('data: "result" : "用户未登录" \n');
			res.write('data: } \n\n');
			res.write('retry: 10000\n');
			res.write('\n\n');
		}
	},1000)
})

//推送已阅
router.get('/hasread', (req, res) => {
	if(isLogin(req)) {
		hasRead(db, req.session.id, function(data) {
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