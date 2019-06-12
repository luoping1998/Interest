const sql_str =  `and,delete,or,exec,insert,select,union,update,count,*,',join,>,<`;

export function filterSqlStr(value){
    const sqlStr = sql_str.split(',');
    let flag = false;
    for(let i = 0, len = sqlStr.length; i < len; i++){
        if(value.toLowerCase().indexOf(sqlStr[i]) !== -1){
            return true;
        }
    }
    return flag;
}

// 是否合法
export function isLegal(str) {
	if( filterSqlStr(str)){
        return false;
    }
    return true;
}

// 邮箱
export function isMail (mail) {
    const mailreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

    if(!mailreg.test(mail)){
        return false;
    }else{
        return true;
    }
}

// 是否在有效范围内(min,max]
export const isRange = (str,min,max) => {
	if(str.length > min && str.length <=max) {
		return true;
	}else {
		return false;
	}
}

const common = {
	isMail,
	isRange,
	isLegal
}

export default common;