function update(oIndex,oPage,oLoad,callback) {
    var start , end, dis, canDo = false;
    oPage.addEventListener("touchstart",function(e){
        start = e.touches[0].pageY;
        // console.log(start);
    })
    oPage.addEventListener("touchmove",function(e){
		end = e.touches[0].pageY;
        // console.log(end);
   })

    oPage.addEventListener("touchend",function(e) {
        // console.log(start - end);
        if(start - end < -80 && oIndex.scrollTop <= 0) {
            oLoad.style.height = '4.5rem';
        	callback();
        }
    })
}

export {
	update
}