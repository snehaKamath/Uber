uberApp = angular.module('uberApp');
uberApp.controller("driverridehistorycontroller",function($scope, $state, $http, $window){
console.log('In driver ride HISTORY controller');
$scope.ridesHistory = [];
$scope.noScroll = false;
$scope.count = 0;
//$scope.loadMore();

$scope.loadMore = function(){
	
	if(!$scope.noScroll ){
		
		console.log("count is "+$scope.ridesHistory.length);
		$scope.noScroll = true;
		console.log('Before making ride history call ');
		console.log($scope.count);
		$http.get('/getDriverRidesHistory/'+$scope.count).success(function(response){
			console.log(response);
			if(response.statusCode == 200){	
				$scope.count = $scope.count + 10;
				console.log($scope.count);
				for(msg in response.message){
					$scope.ridesHistory.push(response.message[msg]);
				} 
				
				$scope.noScroll = false;
			}
			else
				$scope.noScroll = true;
			
		});
	}	
}



});