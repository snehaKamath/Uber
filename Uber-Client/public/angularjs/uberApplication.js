/**
 * http://usejsdoc.org/
 */
var uberApp = angular.module('uberApp', [ 'ngRoute', 'ui.router', 'ngMap','ui.bootstrap','infinite-scroll']);

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
           controller:'driverRideController',
        }).state('myProfile',{
          url:'/adminProfile',
          templateUrl:'partials/myProfile',
        }).state('delete',{
         url:'/delete',
         templateUrl:'partials/delete',
          }).state('customerTrips',{
             url:'/myTrips',
             templateUrl:'partials/customerTrips',
          }).state('customerProfile',{
              url:'/profile',
              templateUrl:'partials/customerProfile',
           }).state('createRide',{
               url:'/createRide',
               templateUrl:'partials/createRide',
            }).state('fetch',{
        url:'/fetch',
        templateUrl:'partials/fetch',
     }).state('riderequest',{
           url:'/riderequests',
           templateUrl:'partials/riderequest',
           controller:'driverRideController',
       }).state('driverridehistory',{
           url:'/driverridehistory',
           templateUrl:'partials/driverridehistory',
           controller:'driverridehistorycontroller',
       }).state('driverprofile',{
           url:'/driverprofile',
           templateUrl:'partials/driverprofile',
           controller:'driverController',
       }).state('ongoingride',{
           url:'/Ridenow',
           templateUrl:'partials/ongoingride',
           controller:'driverRideController',    
      });
         
}]);



