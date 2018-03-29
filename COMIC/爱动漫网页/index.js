window.onload=function(){
//头部tab栏切换函数
var head_ul=document.getElementById("head_ul");
var head_lis=head_ul.children;
var head_tbbds=document.getElementsByClassName("head_tabbody");
for(var i=0;i<head_lis.length;i++){
	head_lis[i].index=i;
	head_lis[i].onmouseover=function(){
		for(var j=0;j<head_lis.length;j++){
			head_lis[j].classList.remove("active");
			head_tbbds[j].classList.remove("show");
		}
		head_lis[this.index].classList.add("active");
		head_tbbds[this.index].classList.add("show");
	}
	head_lis[i].onmouseleave=function(){
		for(var j=0;j<head_lis.length;j++){
			head_lis[j].classList.remove("active");
			head_tbbds[j].classList.remove("show");
		}
		head_lis[0].classList.add("active");
		head_tbbds[0].classList.add("show");
	}
}

//百度搜索框
var bd_val='';
var url='';
var head=document.getElementsByTagName("head")[0];
var bd_search=document.getElementById("bd_search");
var bd_text=document.getElementById("bd_text");
var bd_length=0;
//function jQuery131415920(data){} 是报undefined错误，写成下面的形式就不会报错了。
 jQuery131415920=function(data){
 	bd_text.innerHTML='';
 	if(data.s.length!=0){
 		var ul=document.createElement("ul");
 		if(data.s.length<6){
 			bd_length=data.s.length;
 		}else{
 			bd_length=6;
 		}
		for(var i=0;i<bd_length;i++){
		//console.log(data.s[i]);
		var li=document.createElement("li");
		li.innerHTML=data.s[i];
		ul.appendChild(li);
		}
		bd_text.appendChild(ul);
 	}
}
bd_search.oninput=function(){
	bd_val=bd_search.value;
	url="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+bd_val+"&json=1&p=3&sid=1447_21099_17001_25178_20719&req=2&csor=2&pwd=d&cb=jQuery131415920";
	var script=document.createElement("script");
	script.src=url;
	head.appendChild(script);
	
}
bd_search.onblur=function(){
	bd_text.innerHTML='';
	bd_search.value='';
}

//精灵图的代码
var spirit=document.getElementById("spzt");
var inputs=document.getElementsByTagName("input");
var sp_heng=0;
var sp_shu=0;
var sp_val=0;
var sp_x=0; //图片的x坐标
var sp_y=0; //图片的y坐标
//按钮的点击事件
for(var i=0;i<inputs.length;i++){
	inputs[i].onclick=function(){
		sp_val=this.value;
		switch(sp_val){
			case "↑":sp_shu++;break;
			case "↓":sp_shu--;break;
			case "←":sp_heng--;break;
			case "→":sp_heng++;break;
		}
		spxy();
	}
}
//计算及设置背景的函数
function spxy(){
	if(sp_shu>2){
			sp_shu=0;
		}else if(sp_shu<0){
			sp_shu=2;
		}
		if(sp_heng>2){
			sp_heng=0;
		}else if(sp_heng<0){
			sp_heng=2;
		}
		sp_x=sp_heng*166;
		sp_y=sp_shu*174;
		spirit.style.backgroundPosition=sp_x+"px"+" "+sp_y+"px";
		//console.log(sp_x+"  "+sp_y);
}
//定时变换函数
function sp_switch(){
	setInterval(function(){
		sp_shu=parseInt(Math.random()*10)%3;
		sp_heng=parseInt(Math.random()*10)%3;
		//console.log(sp_shu+"--"+sp_heng);
		spxy();
	},5000);
}
sp_switch();

//放大镜的代码
var zoom=document.getElementById("zoom");
var z_zt=document.getElementById("z_zt");
var z_mask=document.getElementById("z_mask");
var zval_X=0;
var zval_Y=0;
var z_dd=document.getElementById("z_dd");
z_zt.onmouseover=function(event){
	//console.log(z_mask.style.height);
	//z_mask.style.display="block";
	//z_dd.style.display="block";
	z_mask.style.visibility="visible";
	z_dd.style.visibility="visible";
	var that=this;
	document.onmousemove=function(event){
		zval_X=event.pageX-zoom.offsetLeft-z_mask.offsetWidth;
		zval_Y=event.pageY-zoom.offsetTop-z_mask.offsetHeight;
		z_maskMove(zval_X,zval_Y);//调用mask移动函数
		z_ddShow(zval_X,zval_Y);
	}
}
//mask移动函数
function z_maskMove(zval_X,zval_Y){
	  if(zval_X<0){
	   		zval_X=0;
		}else if(zval_X>340){
			zval_X=340;
		}
		if(zval_Y<0){
			zval_Y=0;
		}else if(zval_Y>180){
			zval_Y=180;
		}
		z_mask.style.left=zval_X+"px";
		z_mask.style.top=zval_Y+"px";
}
//显示大图的函数
var z_beishu=1.5;
function z_ddShow(zval_X,zval_Y){
	z_dd.style.backgroundPosition="-"+zval_X*z_beishu+"px"+" "+"-"+zval_Y*z_beishu+"px";
}
z_zt.onmouseout=function(){
	
	//z_mask.style.display="none";
	//z_dd.style.display="none";
	z_mask.style.visibility="hidden";
	z_dd.style.visibility="hidden";
	document.onmousemove=null;
}

//轮播图
var ul=document.getElementById("lbul");
var lb_spans=document.getElementById("lbqq").children;
var index=0;
//自动播放图片函数
	function autoPlay(){
		setInterval(function(){
		index++;
		if(index==6){
			index=0;
			ul.style.left=0+"px";
		}
		move(index);
		active(index);
	   	},5000);
	}
	
//图片移动函数
	var time=null;
	function move(index){
		clearInterval(time);
		var target=-index*512;
		var current=ul.offsetLeft;
		time=setInterval(function(){
			current=ul.offsetLeft;
			current=current+(target-current)/10;
			ul.style.left=current+'px';
		},10);
	}
//添加class类	
	function active(index){
		for(i=0;i<lb_spans.length;i++){
			lb_spans[i].classList.remove("active");
		}
		lb_spans[index].classList.add("active");
	}
//添加点击事件
	for(i=0;i<lb_spans.length;i++){
		lb_spans[i].index=i;//这步注意了！！
		lb_spans[i].onclick=function(event){
			index=this.index;
			move(index);
			active(index);
		}
	}
//调用自动播放函数
	autoPlay();

//手风琴效果
	var sfq_lis=document.querySelectorAll(".sfq>.sfqzt>li");
	var length=sfq_lis.length;
	var flag=-1;
	var sfq_timer=null;

	for(var i=0;i<length;i++){
		sfq_lis[i].index=i;
		sfq_lis[i].style.zIndex=i;
		sfq_lis[i].style.left=i*120+"px";
		sfq_lis[i].style.width=420+"px";
		//console.log(sfq_lis[i].offsetLeft);
	}
	//添加鼠标移上去事件
	for(var i=0;i<length;i++){
		sfq_lis[i].onmouseenter=function(event){
			//console.log(event.pageX+" "+event.pageY);
			for(var j=0;j<length;j++){
				if(j==this.index&&j!=0){
					sfq_lis[j].style.zIndex=j;
					sfq_lis[j].style.width=420+"px";
				    sfq_lis[j].style.left=j*40+"px";
				    //console.log(sfq_lis[j].style.zIndex+"=="+sfq_lis[j].style.width+"&&"+sfq_lis[j].style.left);
				}
				else if(j<this.index&&j!=0){
					sfq_lis[j].style.zIndex=j;
					sfq_lis[j].style.width=40+"px";
				    sfq_lis[j].style.left=j*40+"px";
				    //console.log(j+" "+sfq_lis[j].style.zIndex+" "+sfq_lis[j].style.left);
				    //console.log(sfq_lis[j].style.zIndex+"=="+sfq_lis[j].style.width+"&&"+sfq_lis[j].style.left);
				}else if(j>this.index){
					sfq_lis[j].style.width=40+"px";
				    sfq_lis[j].style.left=this.index*40+420+(j-this.index-1)*40+"px";
				    sfq_lis[j].style.zIndex=j;
				    //console.log(sfq_lis[j].style.zIndex+"=="+sfq_lis[j].style.width+"&&"+sfq_lis[j].style.left);
				    //console.log(j+" "+sfq_lis[j].style.zIndex+" "+sfq_lis[j].style.left);
				}

			}
	}
}
	for(var i=0;i<length;i++){
		sfq_lis[i].onmouseleave=function(){
			for(var j=0;j<length;j++){
				sfq_lis[j].style.zIndex=j;
				sfq_lis[j].style.left=j*120+"px";
				sfq_lis[j].style.width=420+"px";
			}
			//console.log(this.index+"leave"+" "+this.offsetLeft+"=="+this.zIndex);
		}
}

//旋转轮播图函数
var xztu_array=[
{
	zIndex:1,
	width:300,
	height:150,
	left:50,
	top:0,
	opacity:0.5
},{
	zIndex:2,
	width:400,
	height:200,
	left:150,
	top:75,
	opacity:0.8
},{
	zIndex:3,
	width:550,
	height:275,
	left:350,
	top:175,
	opacity:1
},{
	zIndex:2,
	width:400,
	height:200,
	left:700,
	top:75,
	opacity:0.8
},{
	zIndex:1,
	width:300,
	height:150,
	left:900,
	top:0,
	opacity:0.5
}];
var xztu_lis=document.querySelectorAll(".bar_2 .xztu .xztu_zt li");
function xztu_set(xztu_lis){
for(var p=0;p<xztu_lis.length;p++){
	xztu_lis[p].style.zIndex=xztu_array[p].zIndex;
	xztu_lis[p].style.left=xztu_array[p].left+"px";
	xztu_lis[p].style.top=xztu_array[p].top+"px";
	xztu_lis[p].style.width=xztu_array[p].width+"px";
	xztu_lis[p].style.height=xztu_array[p].height+"px";
	xztu_lis[p].style.opacity=xztu_array[p].opacity;
	}
}
xztu_set(xztu_lis);

function xztu_animation(){
	clearInterval(timerfx);
	var timerfx=setInterval(function(){
		xztu_array.push(xztu_array.shift());
		for(var x=0;x<xztu_lis.length;x++){
			ll_setStyle(xztu_lis[x],xztu_array[x]);
		}
	},3000);
}
xztu_animation();
	
 var finger=document.getElementById("finger");
 window.onscroll=function(event){
 	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
 	if(parseInt(scrollTop)>600){
 		finger.style.display="block";
 	}else{
 		finger.style.display="none";
 	}

 }
//末尾
}
