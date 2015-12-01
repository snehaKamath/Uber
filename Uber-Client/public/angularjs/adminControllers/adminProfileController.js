uberApp = angular.module('uberApp');
uberApp.controller("adminProfileController",function($scope,$http,$window,$state){
   $http.get("/getAdminProfile").success(function(data){
  
    if(data.statusCode==200){
      $scope.profileFound=true;
      $scope.adminProfile=data.message;
    }
    if(data.statusCode==201){
      $scope.errorDialog = true;
      $scope.errorMessage = data.message;
    }
  }).error(function(data){
    $scope.errorDialog = true;
    $scope.errorMessage = data.message;
  })

})
