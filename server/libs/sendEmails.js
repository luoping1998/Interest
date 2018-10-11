var sendEmail = function(mailTransport, options, callback) {
	mailTransport.sendMail(options , function(err, msg) {
		console.log(err);
		if(err) {
			callback({
				'error' : true,
				'result' : '邮箱不存在或错误'
			})
		}else{
			callback({
				'error' : false,
				'result' : '验证码已经发到你的邮箱了哦'
			})
		}
	})
}	

module.exports = sendEmail;