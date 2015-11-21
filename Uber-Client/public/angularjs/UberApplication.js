/**
 * http://usejsdoc.org/
 */
var uberApp = angular.module('uberApp', [ 'ngRoute', 'ui.router' ]);

uberApp.config([ '$urlRouterProvider', '$stateProvider',
      function($urlRouterProvider, $stateProvider) {
         $urlRouterProvider.otherwise('/');
         $stateProvider.state('approveRequests', {
            url : '/approveRequests',
            templateUrl : 'partials/approveRequests'
          }).state('viewReviews',{
            url : '/viewReviews',
            templateUrl : 'partials/viewReviews',
         }).state('statistics',{
            url:'/statistics',
            templateUrl:'partials/statistics',
         }).state('billDetails',{
           url:'/billDetails',
           templateUrl:'partials/billDetails',
        }).state('myProfile',{
          url:'/myProfile',
          templateUrl:'partials/myProfile',
       }).state('delete',{
         url:'/delete',
         templateUrl:'partials/delete',
      }).state('homePage',{
        url:'/homePage',
        templateUrl:'/homePage',
     })
}])

uberApp.controller("adminController",function($scope,$http,$window,$state){
  
  $scope.adminSignIn=function(){
    admin_credentials={adminEmailid:$scope.adminEmailid,adminPassword:$scope.adminPassword};
    $http.post("/adminSignIn",admin_credentials).success(function(data){
      
      alert(data.status);
      if(data.status=="login successful"){
        window.location.assign('homePage');
       }
        
    }).error(function(data){
      alert("error");
    })
     
  }
  
})



