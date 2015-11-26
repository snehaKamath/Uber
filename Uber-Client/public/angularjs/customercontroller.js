uberApp = angular.module('uberApp',[]);
uberApp.controller("customercontroller",function($scope, $http) {
  
	  $scope.authenticate=function(credentials){
    
    $http.post("/customerSignIn",credentials).success(function(data){
    	
    	if(data.statusCode == 401)
    	{
    		$scope.errorDialog = true;
    		$scope.errorMessage = data.message;
    	}
    	else
    		{
    			window.location.assign('homePage');
    		}
      
    }).error(function(data){
      $scope.errorMessage = "Unexpected Error";
    }); 
 
  }; 
});