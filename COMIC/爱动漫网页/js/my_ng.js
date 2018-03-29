angular.module("myAngular",[]).controller("Controller",['$scope','$window',function($scope,$window){
	$scope.list=$window.localStorage.tudo?JSON.parse($window.localStorage.tudo):[];
	$scope.comments=$window.localStorage.comments?JSON.parse($window.localStorage.comments):[];
	$scope.add=function(){
		if($scope.text){
			var val=$scope.text;
			$scope.text='';
			$scope.list.push({
			id:getId(),
			text:val,
			completed:false
		});
			$window.localStorage.tudo=JSON.stringify($scope.list);
			//console.log($scope.list);
		}
		
	}

	function getId(){
		var id=Math.random();
		for(var i=0;i<$scope.list.length;i++){
			if($scope.list[i].id===id){
				getId();
				return false;
			}else{
				return id;
			}
		}
	}

	$scope.delete=function(id){
		var temp=[];
		for(var j=0;j<$scope.list.length;j++){
			if($scope.list[j].id!=id){
				temp.push($scope.list[j]);
			}
		}
		$scope.list=temp;
		$window.localStorage.tudo=JSON.stringify($scope.list);
	}

	$scope.completed=function(id){
		for(var j=0;j<$scope.list.length;j++){
			if($scope.list[j].id===id){
				$scope.list[j].completed=true;
			}
		}
		$window.localStorage.tudo=JSON.stringify($scope.list);
	}

	$scope.getComment=function(){
		if($scope.comment){
			$scope.comments.push($scope.comment);
			$scope.comment='';
			$window.localStorage.comments=JSON.stringify($scope.comments);
			//console.log($scope.comments+" "+$scope.comments.length);
		}
	}
	
	$scope.clearComment=function(){
		$scope.comments=[];
		$window.localStorage.comments=JSON.stringify($scope.comments);
		//console.log($scope.comments);
	}

}]);