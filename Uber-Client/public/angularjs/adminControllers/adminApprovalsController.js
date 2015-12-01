uberApp = angular.module('uberApp');
uberApp.controller("driverApprovalsController",function($scope,$http,$window,$state){
  
  $scope.driverApprovals = [];
  
    $scope.viewDriverApprovals = function() {
    $scope.driverApprovalClicked=true;
    $http.get("/viewDriverApprovals").success(function(data) {
      if (data.statusCode == 200) {
        $scope.driverApprovals=data.message;
      }else if(data.statusCode==201){
         $scope.driverApprovalStatus=true;
         $scope.driverApprovalStatusMessage=data.message;
      }else if(data.statusCode==401){
         $scope.driverApprovalStatus=true;
         $scope.driverApprovalStatusMessage=data.message;
      }
    }).error(function(data) {
       $scope.driverApprovalStatus=true;
       $scope.driverApprovalStatusMessage="database error";
    })
  };
  
  $scope.setCurrentDriverRequest=function(request){
    $scope.currentDriverRequest=request;
    $scope.getCarDetails(request);
  };
  
  $scope.getCarDetails=function(request){
    
    getDriverCarDetails={driverId:request.DRIVER_ID};
    $http.post('/getDriverCarDetails',getDriverCarDetails).success(function(data){
    if(data.statusCode==200){
      $scope.currentDriverRequest.carBrand=data.message.car.brand;
      $scope.currentDriverRequest.carNumber=data.message.car.number;
     
    }else if(data.statusCode==401){
     $scope.noCarDetails=true;
     $scope.noCarDetailsMessage="no car details found";
     }
    }).error(function(data){
      $scope.noCarDetails=true;
      $scope.noCarDetailsMessage="unexpected error";
    });
  };
  
  $scope.approveDriverRequest=function(){
    var driverRequest={driverId:$scope.currentDriverRequest.DRIVER_ID}
    $http.post('/approveDriverRequest',driverRequest).success(function(data){
      if(data.statusCode==200){
        var currentApprovalsPending = $scope.driverApprovals;
        var runtime=[];
        for(var i = 0; i < currentApprovalsPending.length; i++) {
          if(currentApprovalsPending[i].DRIVER_ID != $scope.currentDriverRequest.DRIVER_ID)  {
            runtime.push(currentApprovalsPending[i]);
          }
        }
                
        $scope.driverApprovals = [];
        for(var i = 0; i < runtime.length; i++) {
          $scope.driverApprovals.push(runtime[i]);
        }
        $scope.driverApprovalStatus=true;
        $scope.driverApprovalStatusMessage="Driver approved";
      }else if(data.statusCode==401){
        $scope.driverApprovalStatus=true;
        $scope.driverApprovalStatusMessage=data.message;
      }
    }).error(function(data){
      $scope.driverApprovalStatus=true;
      $scope.driverApprovalStatusMessage="unexpected error ";
    });
  };
 });


uberApp.controller("customerApprovalsController",function($scope,$http,$window,$state){

  $scope.viewCustomerApprovals=function(){
    $scope.customerApprovalClicked=true;
    $http.get("/viewCustomerApprovals").success(function(data) {
      if (data.statusCode == 200) {
        $scope.customerApprovals=data.message;
        
      }else if(data.statusCode==201){
         $scope.customerApprovalStatus=true;
         $scope.customerApprovalStatusMessage=data.message;
      }else if(data.statusCode==401){
         $scope.customerApprovalStatus=true;
         $scope.customerApprovalStatusMessage=data.message;
      }
    }).error(function(data) {
       $scope.customerApprovalStatus=true;
       $scope.customerApprovalStatusMessage="database error";
    })
    } ;
  
  $scope.setCurrentCustomerRequest=function(request){
    $scope.currentCustomerRequest=request;
  };
  
  $scope.approveCustomerRequest=function(){
    var customerRequest={customerId:$scope.currentCustomerRequest.CUSTOMER_ID};
    $http.post('/approveCustomerRequest',customerRequest).success(function(data){
      if(data.statusCode==200){
        var currentApprovalsPending = $scope.customerApprovals;
        var runtime=[];
        for(var i = 0; i < currentApprovalsPending.length; i++) {
          if(currentApprovalsPending[i].CUSTOMER_ID != $scope.currentCustomerRequest.CUSTOMER_ID)  {
            runtime.push(currentApprovalsPending[i]);
          }
        }
        $scope.customerApprovals = runtime;
        $scope.customerApprovalStatus=true;
        $scope.customerApprovalStatusMessage="Customer approved";

      }else if(data.statusCode==401){
        $scope.customerApprovalStatus=true;
        $scope.customerApprovalStatusMessage=data.message;
      }
    }).error(function(data){
      $scope.customerApprovalStatus=true;
      $scope.customerApprovalStatusMessage="unexpected error";
    });
  };
  
})



