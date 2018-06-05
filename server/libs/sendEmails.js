var sendEmail = function(mailTransport, options, callback) {
	console.log('email:',options);
	mailTransport.sendMail(options , function(err, msg) {
		if(err) {
			// console.log(err);
			callback({
				'error' : true,
				'result' : '服务器出错'
			})
		}else{
			console.log(msg);
			callback({
				'error' : false,
				'result' : '验证码已经发到你的邮箱了哦'
			})
		}
	})
}	

module.exports = sendEmail;