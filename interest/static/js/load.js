function Loading(oIndex,oPar, oCh, callback) {
	var start , end, dis, canDo = false;
    var pre = 0;
    oPar.addEventListener("touchstart",function(e){
        start = e.touches[0].pageY;
    })
    oPar.addEventListener("touchmove",function(e){
		end = e.touches[0].pageY;
   })

    oPar.addEventListener("touchend",function(e) {
        let now = new Date();
        if(now - pre >= 4000) {
            if(start - end > 80 && oIndex.scrollTop + oIndex.clientHeight >= oIndex.scrollHeight) {
                oCh.style.height = '4.5rem';
            	callback();
                pre = now;
            }
        }
    })
}

export{
	Loading
}