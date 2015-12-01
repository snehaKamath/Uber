/**
 * http://usejsdoc.org/
 */
uberApp = angular.module('uberApp');
uberApp.controller("fetchDriversController",function($scope,$http,$window,$state){
 
  $scope.noScroll = false;
  $scope.count = 0;
  $scope.drivers= [];
  
  $scope.viewDrivers = function() {
    $scope.viewDriversClicked=true;
  };
  
  $scope.setCurrentDriver=function(driver){
    $scope.currentDriver=driver;
    $scope.getCarDetails(driver);
  };
  
  $scope.getCarDetails=function(request){
    getDriverCarDetails={driverId:request.DRIVER_ID};
 
   $http.post('/getDriverCarDetails',getDriverCarDetails).success(function(data){
   if(data.statusCode==200){
     $scope.currentDriver.carBrand=data.message.car.brand;
     $scope.currentDriver.carNumber=data.message.car.number;
   }else if(data.statusCode==401){
     $scope.noCarDetails=true;
     $scope.noCarDetailsMessage="no car details found";
     }
    }).error(function(data){
      $scope.noCarDetails=true;
      $scope.noCarDetailsMessage="Unexpected error";
    });
  };
  

  $scope.loadMore = function(){
          if(!$scope.noScroll ){
          $scope.noScroll = true; 
          $http.get('/getDrivers/'+$scope.count).success(function(data){
          if(data.statusCode == 200){ 
              $scope.count = $scope.count + 2;
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