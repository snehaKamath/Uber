/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
uberApp = angular.module('uberApp');
uberApp.controller("viewDriverReviewsController",function($scope,$http,$window,$state){
   
   $scope.noScrollDrivers = false;
   $scope.countDrivers = 0;
   $scope.drivers= [];

   $scope.driverReviews = [];
   $scope.noScrollReviews= false;
   $scope.countReviews = 0;
   
  $scope.viewDrivers = function() {
   $scope.viewDriversClicked=true;
  };
  
  $scope.setCurrentDriver=function(driver){
    $scope.currentDriver=driver;
    
  };
  
 $scope.loadMoreDrivers = function(){
    if(!$scope.noScrollDrivers ){
       alert($scope.countDrivers);
       $scope.noScrollDrivers = true; 
       $http.get('/getDrivers/'+$scope.countDrivers).success(function(data){
       if(data.statusCode == 200){ 
           $scope.count = $scope.countDrivers + 2;
           for(var i=0;i<data.message.length;i++){
           $scope.drivers.push(data.message[i]);
           }
           $scope.noScroll = false;
     }else{
           $scope.noScroll = true;
           $scope.noRequestsDialog=true;
           $scope.noRequestsMessage=data.message;
     }
         
       });
     } 
 };
    
 
$scope.loadDriverReviews = function(){
    
    if(!$scope.noScrollReviews ){
      
      console.log("count is "+$scope.driverReviews.length);
      $scope.noScrollReviews = true;
       $http.get('/getDriverReviews/'+$scope.currentDriver.DRIVER_ID+"/"+$scope.countReviews).success(function(response){
        if(response.statusCode == 200){ 
          $scope.countReviews = $scope.countReviews + 10;
          for(msg in response.message){
           $scope.driverReviews.push(response.message[msg]);
          } 
          
          $scope.noScrollReviews= false;
        }
        else
          $scope.noScrollReviews = true;
      });
    } 
}
 
 });




uberApp.controller("fetchCustomersController",function($scope,$http,$window,$state){
  $scope.customers= [];
  $scope.noScroll = false;
  $scope.count = 0;
  
  $scope.viewCustomers = function() {
    $scope.viewCustomersClicked=true;
  };
  
  $scope.setCurrentCustomer=function(customer){
    $scope.currentCustomer=customer;
  };

  $scope.loadMore = function(){
    if(!$scope.noScroll ){
          $scope.noScroll = true;
          $http.get('/getCustomers/'+$scope.count).success(function(data){
            if(data.statusCode == 200){ 
             $scope.count = $scope.count + 10;
             for(var i=0;i<data.message.length;i++){
               $scope.customers.push(data.message[i]);
               }
             
              $scope.noScroll = false;
     }else{
              $scope.noScroll = true;
              $scope.noRequestsDialog=true;
              $scope.noRequestsMessage=data.message;
     }
            
    });
        } 
    }
});