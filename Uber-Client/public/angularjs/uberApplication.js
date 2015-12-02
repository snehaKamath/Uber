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
        }).state('adminProfile',{
          url:'/adminProfile',
          templateUrl:'partials/adminProfile',
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
            }).state('updateRide',{
                url:'/updateRide',
                templateUrl:'partials/updateRide',
                params : {rideId : null}
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
uberApp.factory("uberService", function(){
	
	var check;
	var rideId;
	

	  // public API
	  return {
	    getRideHider: function () { return check; },
	    setRideHider: function ( id ) { check = id; },
	    getRideId: function () { return rideId; },
	    setRideId: function ( id ) { rideId = id; }
	  };
});



