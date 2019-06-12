function update(oIndex,oPage,oLoad,callback) {
    let start , end, dis, canDo = false;
    let pre = 0;
    oPage.addEventListener("touchstart",function(e){
        start = e.touches[0].pageY;
    })
    oPage.addEventListener("touchmove",function(e){
		end = e.touches[0].pageY;
   })

    oPage.addEventListener("touchend",function(e) {
        let now = new Date();
        if(now -  pre>= 4000 && start - end < -80 && oIndex.scrollTop <= 0) {
            oLoad.style.height = '4.5rem';
            pre = now;
        	callback();
        }
    })
}

export {
	update
}