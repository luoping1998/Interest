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
	var count = 0;
	res.writeHead(200, {
		'Content-Type' : 'text/event-stream',
		'Cache-Control' : 'no-cache',
		'Connection' : 'keep-alive',
		'Access-Control-Allow-Origin' : '*'
	});
	interval = setInterval(() => {
		if(user) {
			checkPromp(db, user.id, (data) => {
				// console.log(data.hasnew);
				if(count == 0) {
					res.write(`id: ${new Date()}\n`);
					res.write('data: ' + JSON.stringify(data) + '\n\n');
					res.write('retry: 10000\n');
					res.write('\n\n');
					count ++;
				}else if(data.hasnew) {
					res.write(`id: ${new Date()}\n`);
					res.write('data: ' + JSON.stringify(data) + '\n\n');
					res.write('retry: 10000\n');
					res.write('\n\n');
				}
			})
		}else {
			var mes = {
				'error' : true,
				'result' : '用户未登录'
			}
			res.write(`id: ${new Date()}\n`);
			res.write('data: '+ mes +' \n\n');
			res.write('retry: 10000\n');
			res.write('\n\n');
			clearInterval(interval);
		}
	},1000);
	req.connection.addListener('close', () => {
		clearInterval(interval);
	},false);
})

//推送已阅
router.get('/hasread', (req, res) => {
	if(isLogin(req)) {
		hasRead(db, req.session.user.id, function(data) {
			if(data.error) {
				res.send(data);
			}else {
				checkPromp(db, req.session.user.id, function(data) {
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

module.exports = router;