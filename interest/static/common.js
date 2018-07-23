function filterSqlStr(value){
    var sqlStr=sql_str().split(',');
    var flag=false;
    for(var i=0;i<sqlStr.length;i++){
        if(value.toLowerCase().indexOf(sqlStr[i])!=-1){
            flag=true;
            break;
        }
    }
    return flag;
}

function sql_str(){
    var str="and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
    return str;
}

//是否合法
var isLegal = function(str) {
	if(filterSqlStr(str)){
        return false;
    }
    return true;
}

//邮箱
function isMail(mail) {
    var mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    if(!mailreg.test(mail)){
        return false;
    }else{
        return true;
    }
}

//是否在有效范围内(min,max]
function isRange(str,min,max) {
	if(str.length > min && str.length <=max) {
		return true;
	}else {
		return false;
	}
}

export {
	isMail,
    isRange,
    isLegal
}