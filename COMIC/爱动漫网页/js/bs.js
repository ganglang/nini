
$(function(){
	//栅格系统的
	$(".dyone").each(function(index,element){
			$(this).mouseenter(function(){
			$(".dymark").eq(index).css("display","block");
			$(".dyhidden").eq(index).css("display","block");
		}).mouseleave(function(){
			$(".dymark").eq(index).css("display","none");
			$(".dyhidden").eq(index).css("display","none");
		});
	});
	//tab栏的
	$('#myTabs a').click(function (e) {	//jquery要求1.9版本以上的
  		e.preventDefault()
  		$(this).tab('show')
	});

	document.getElementById("video").volume=0.1;
//末尾
});