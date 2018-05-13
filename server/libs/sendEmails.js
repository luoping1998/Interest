var sendEmail = function(mailTransport, options, callback) {
	console.log('email:',options);
	mailTransport.sendMail(options , function(err, msg) {
		if(err) {
			console.log(err);
			callback({
				'error' : true,
				'result' : err
			})
		}else{
			console.log(msg);
			callback({
				'error' : false,
				'result' : msg
			})
		}
	})
}	

module.exports = sendEmail;