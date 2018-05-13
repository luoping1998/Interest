var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var bodyParser = require('body-parser');

var users = require('./routers/users.js');

const server = express();

// server.use(cookieParser());
// server.use(session({
// 	secret : ''
// }));

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

server.use(bodyParser.urlencoded({ extended: false }));
server.listen(8000);

server.use('/users',users);

console.log('run at localhost:8000');