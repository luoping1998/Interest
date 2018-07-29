function Loading(oIndex,oPar, oCh, callback) {
	var start , end, dis, canDo = false;
    oPar.addEventListener("touchstart",function(e){
        start = e.touches[0].pageY;
    })
    oPar.addEventListener("touchmove",function(e){
		end = e.touches[0].pageY;
   })

    oPar.addEventListener("touchend",function(e) {
        if(start - end > 80 && oIndex.scrollTop + oIndex.clientHeight >= oIndex.scrollHeight) {
            oCh.style.height = '4.5rem';
        	callback();
        }
    })
}

export{
	Loading
}