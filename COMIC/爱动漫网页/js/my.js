
//动态设置样式函数
function ll_setStyle(dom,json){
	clearInterval(dom.timer);
	dom.timer=setInterval(function(){
		var flag=true;  //这个标记放在setInterval里面.
		for(var attr in json){
		var current=parseInt(ll_getStyle(dom,attr));	//这里一定要首先用parseInt函数
		//console.log(attr+current);
		var target=json[attr];
		var step=(target-current)/10;
		step=step>0?Math.ceil(step):Math.floor(step);
		if(attr=="opacity"){
			dom.style.opacity=target;
			
		}else if(attr=="zIndex"){
			dom.style[attr]=target;
		}else{
			dom.style[attr]=current+step+"px";
		}
		if(current!=target){	//这个判断放在for循环里面才行
			flag=false;
		}
	}
		if(flag){clearInterval(dom.timer);}	//这个判断放在for循环外面,放在setInterval里面.
	},10);
}
//获取样式值的函数
function ll_getStyle(dom,attr){
	if(dom.currentStyle){	//ie
		return dom.currentStyle[attr];
	}else{
		return window.getComputedStyle(dom,null)[attr]; //w3c
	}
}