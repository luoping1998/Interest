function isLogin(req) {
	if(req.session && req.session.user){
        req.session.cookie.expires= new Date(Date.now() + 20 * 60 * 1000);
        return true;
    }else{
    	return false;
    }
}

module.exports = isLogin;