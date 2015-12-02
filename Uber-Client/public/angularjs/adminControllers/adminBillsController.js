/**
 * http://usejsdoc.org/
 */
uberApp = angular.module('uberApp');
uberApp.controller("adminBillsController",function($scope,$http,$window,$state){
  $scope.ssnid="Bill ID";
 $scope.searchBill=function(){
    $scope.invalidSSN=false;
    if($scope.ssn_id_1===undefined){
      $scope.invalidSSN=true;
      $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234";
    }
    ssn=$scope.ssn_id_1.concat($scope.ssn_id_2,$scope.ssn_id_3);
    var regExpNumber=/(\d{9})/;
     if(!regExpNumber.test(ssn) ){
        $scope.invalidSSN=true;
        $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234";
     }
     
    if($scope.invalidSSN==false){
      ssn=Number($scope.ssn_id_1+$scope.ssn_id_2+$scope.ssn_id_3);
      searchBill={id:ssn,"idType":$scope.ssnid};
      
     $http.post('/searchBill',searchBill).success(function(data){
     if(data.statusCode==200){
         $scope.valid=true;
         $scope.allBillDetails=data.message;
         $scope.validBill=true;
      }
    else{
       $scope.invalidSSN=true;
       $scope.invalidSSNmessage=data.message;
        $scope.validBill=false;
    }
    }).error(function(data){
       $scope.invalidSSN=true;
       $scope.invalidSSNmessage="unexpected error";
         $scope.validBill=false;
    });
        
 }
      
}
});
  

