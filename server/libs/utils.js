const crypto = require('crypto');
const keys = require('./keys');

let decrypt = function(data) {
	let result = crypto.privateDecrypt({
			padding : crypto.constants.RSA_PKCS1_PADDING,
			key: keys.privKey
		},
		Buffer.from(data,'base64'), 
	)
	return result.toString();
}

module.exports = decrypt;