function isLogin(req) {
	if(req.session && req.session.user){
        return true;
    }else{
    	return false;
    }
}

module.exports = isLogin;