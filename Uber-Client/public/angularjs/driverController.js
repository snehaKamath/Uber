uberApp = angular.module('uberApp');
uberApp.controller("driverController",function($scope,$state, $http,$window){
  
  $scope.authenticate=function(credentials){
    
    $http.post("/driverSignIn",credentials).success(function(data){
    	
    	if(data.statusCode == 401)
    	{
    		$scope.errorDialog = true;
    		$scope.errorMessage = data.message;
    	}
    	else
    		{
    			window.location.assign('home');
    		}
      
    }).error(function(data){
      $scope.errorMessage = "Unexpected Error";
    }); 
 
  }; 
});

