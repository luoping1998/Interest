var express = require('express');
const server = express();

var ws = require('nodejs-websocket');
var checkPromp = require('./prompt/check_prompt.js');          //查询推送
var db = require('./mysql/db');

var Wserver = ws.createServer(function(conn) {
    var timer, id;
    var count = 0;
    conn.on('text', function(str) {
        id = str;
        timer = setInterval(() => {
            if(id) {
                checkPromp(db, id, (data) => {
                    if(count == 0) {
                        conn.sendText(JSON.stringify(data)); 
                        count ++;
                    }else if(data.hasnew) {
                        conn.sendText(JSON.stringify(data)); 

                    }
                })
            }else {
                var mes = {
                    'error' : true,
                    'result' : '用户未登录'
                }
                conn.sendText(mes);
                clearInterval(timer);
            }
        },5000);
    })

    conn.on('close', function(code, res) {
        clearInterval(timer);
    })

    conn.on('error', function(code, res) {
        clearInterval(timer);
        console.log('异常.');
    })

}).listen(8090);

var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');
// var redisStore = require('connect-redis')(session);

var users = require('./routers/users.js');
var msgs = require('./routers/msgs.js');
var cmts = require('./routers/comments.js');
var prompt = require('./routers/prompt.js');

var keys = [];
for(var i = 0; i < 10000; i ++) {
    keys[i]='a_'+Math.random();
}

server.use(cookieParser(keys));
server.use(session({
	name : 'connect.sid',
	secret : 'connect_sess_redis',
	cookie: {'maxAge':20*60*1000 },
	resave :false,
	saveUninitialized : true
}));

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    //将外源设为指定的域，比如：http://localhost:8080
    res.header("Access-Control-Allow-Origin", "*");
    //将Access-Control-Allow-Credentials设为true  允许携带cookie
    res.header('Access-Control-Allow-Credentials', true); 
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));
server.listen(8000);

server.use('/users',users);
server.use('/msgs',msgs);
server.use('/cmts',cmts);
server.use('/prom',prompt);

console.log('run at http://139.199.205.91:8000');