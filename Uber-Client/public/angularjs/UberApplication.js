/**
 * http://usejsdoc.org/
 */
var uberApp = angular.module('uberApp', [ 'ngRoute', 'ui.router','infinite-scroll','ui.bootstrap']);

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
          url:'/myProfile',
          templateUrl:'partials/myProfile',
       }).state('delete',{
         url:'/delete',
         templateUrl:'partials/delete',
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
         }
]);



