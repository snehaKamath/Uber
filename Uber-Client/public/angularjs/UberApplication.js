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
      });
}])



