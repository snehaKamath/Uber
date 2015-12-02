
uberApp = angular.module('uberApp');
uberApp.controller("deleteDriverController",function($scope,$http,$window,$state){
    $scope.deleteDriverClicked=function(){
    $scope.deleteDriverClick=true;
  }
  
  $scope.deleteDriver=function(){
    $scope.invalidSSN=false;
    ssn=$scope.driver_id_1.concat($scope.driver_id_2,$scope.driver_id_3);
    var regExpNumber=/(\d{9})/;
     if(!regExpNumber.test(ssn) ){
        $scope.invalidSSN=true;
        $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
     }
     
       if($scope.invalidSSN==false){
        ssn=Number($scope.driver_id_1+$scope.driver_id_2+$scope.driver_id_3);
        deleteDriverId={driverId:ssn};
        $http.post('/deleteDriver',deleteDriverId).success(function(data){
          if(data.statusCode==200){
            $scope.driverDeleted=true;
            $scope.driverDeletedMessage="driver deleted";
          }else if(data.statusCode==401){
            $scope.driverNotDeleted=true;
            $scope.driverNotDeletedMessage=data.message;
          }else if(data.statusCode==201){
            $scope.driverAlreadyDeleted=true;
            $scope.driverAlreadyDeletedMessage=data.message;
          }
        }).error(function(data){
           $scope.driverNotDeleted=true;
          $scope.driverNotDeletedMessage="Unexpected error";
        })
      };
        
  }
  
})

uberApp.controller("deleteCustomerController",function($scope,$http,$window,$state){
  

  
  $scope.deleteCustomer=function(){
  $scope.invalidSSN=false;
    
    ssn=$scope.customer_id_1.concat($scope.customer_id_2,$scope.customer_id_3);
      
      var regExpNumber=/(\d{9})/;
      if(!regExpNumber.test(ssn) ){
         $scope.invalidSSN=true;
         $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
      }
     
      if($scope.invalidSSN==false){
        ssn=Number($scope.customer_id_1+$scope.customer_id_2+$scope.customer_id_3);
        deleteCustomerId={customerId:ssn};
        $http.post('/deleteCustomer',deleteCustomerId).success(function(data){
         if(data.statusCode==200){
            $scope.customerDeleted=true;
            $scope.customerDeletedMessage="customer deleted";
          }else if(data.statusCode==401){
            $scope.customerNotDeleted=true;
            $scope.customerNotDeletedMessage="Error! Customer not deleted";
          }else if(data.statusCode==201){
            $scope.customerAlreadyDeleted=true;
            $scope.customerAlreadyDeletedMessage="This customer has already been deleted";
          }
        }).error(function(data){
          $scope.customerNotDeleted=true;
          $scope.customerNotDeletedMessage="Unexpected error";
        })
      };
        
  }
  
})

uberApp.controller("deleteBillController",function($scope,$http,$window,$state){
    
  $scope.deleteBill=function(){
  $scope.invalidSSN=false;
    
    ssn=$scope.bill_id_1.concat($scope.bill_id_2,$scope.bill_id_3);
     var regExpNumber=/(\d{9})/;
     if(!regExpNumber.test(ssn) ){
        $scope.invalidSSN=true;
        $scope.invalidSSNmessage="Bill ID has to be in the format 123-12-1234";
     }
     
     if($scope.invalidSSN==false){
        ssn=Number($scope.bill_id_1+$scope.bill_id_2+$scope.bill_id_3);
        deleteBillid={billid:ssn};
        $http.post('/deleteBill',deleteBillid).success(function(data){
        if(data.statusCode==200){
            $scope.billDeleted=true;
            $scope.billDeletedMessage="bill deleted";
          }else if(data.statusCode==401){
            $scope.billNotDeleted=true;
            $scope.billNotDeletedMessage=data.message;
          }else if(data.statusCode==201){
            $scope.billAlreadyDeleted=true;
            $scope.billAlreadyDeletedMessage=data.message;
          }
        }).error(function(data){
           $scope.billNotDeleted=true;
          $scope.billNotDeletedMessage="Unexpected error";
        })
      };
        
  }
  
})