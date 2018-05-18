var login = function( db, email, name,callback) {
	//id:id  name:昵称  level:等级  follower粉丝  following我关注的  signature签名
	var sem = 'SELECT `id`,`email`,`u_name`,`u_level`,`follower`,`following`,`signature` , `msgnum` FROM `usertable` WHERE `email` = \'' + email +'\'';
	var sna = 'SELECT `id`,`email`,`u_name`,`u_level`,`follower`,`following` ,`signature` , `msgnum` FROM `usertable` WHERE `u_name` = \'' + name +'\'';
	//content:话题正文  msgid:话题id  lnum:喜欢量  snum:分享量  cnum:评论量
	var str ;
	if(email) str = sem;
	else str = sna;
	
	var infor = {};
	db.query( str, function( err, data) {
		if(err){
			callback({
				'error' : true,
				'result' : err
			})
		}else{
			infor =  JSON.parse(JSON.stringify(data))[0];
			var id = infor.id;
			var smsg = 'SELECT `content`,`mgsid`,`Lnum`,`Snum`,`Cnum` FROM `mgstable` WHERE `u_id` = '  + id ;
			db.query( smsg, function( err, data) {
				if(err){
					callback({
						'error' : true,
						'result' : err
					})
				}else {
					callback({
						'error' : false,
						'infor' : infor,
						'sended' : JSON.parse(JSON.stringify(data)),
						'msg' : 'login success'
					});
				}
			})
		}
	});
}

module.exports = login ;