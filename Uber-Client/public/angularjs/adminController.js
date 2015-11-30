var uberApp = angular.module('uberApp');
uberApp.controller("adminController",function($scope,$http,$window,$state){
  
  $scope.adminSignIn=function(){
    admin_credentials={adminEmailid:$scope.adminEmailid,adminPassword:$scope.adminPassword};
    $http.post("/adminSignIn",admin_credentials).success(function(data){
      
      alert(data.status);
      if(data.status=="login successful"){
        window.location.assign('home');
       }
        
    }).error(function(data){
      alert("error");
    })
     
  }
  
})
