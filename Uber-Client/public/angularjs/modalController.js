var uberApp = angular.module('uberApp');
uberApp.controller("modalController",function($scope,$http,$window,$state, $uibModalInstance, param){
	
	$scope.ride = param.rideDetails;
	
  $scope.submitReview = function(feedback){
	  $http.post('/reviewDriver', {rating : feedback.rating, comments : feedback.comments, rideId : $scope.ride.ride_id, driverId : $scope.ride.driver_id}).success(function(response){
		
		  if(response.statusCode == 200){
			  uberService.hideRider(true);
			  window.location.reload();
		  }
		  else
			  {
			  	$scope.errorMessage = true;
			  	console.log("Not done");
			  }
		  
	  })
  }
  
  $scope.cancel = function(){
	  
	  
	  $uibModalInstance.dismiss('cancel');
  }
 
 
  
  
})
