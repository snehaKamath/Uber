/**
 * http://usejsdoc.org/
 */

uberApp = angular.module('uberApp');

uberApp.controller("adminGraphsController",function($scope,$http,$window,$state){
  $scope.perCustomer=false;
  
  $scope.getRevenueGraph=function(){
   $http.get('/getRevenueGraph').success(function(data){
     if(data.statusCode==200) {
        $scope.loadGraph=true;
        $scope.revenueGraphInput=[];
        var days=data.message;
         for(var i=0;i<days.length;i++){
         revenueGraphSubArray=[];
          revenueGraphSubArray[0]=days[i].billing_date.toString();
          revenueGraphSubArray[1]=days[i].revenue;
          $scope.revenueGraphInput.push(revenueGraphSubArray);
      }
          $scope.loadGraph1=true;
      }
      
      }).error(function(data){
      
    });
  };
  
  
  $scope.getPerZipCodeGraph=function(){
    $scope.zipCode=true;
  }
  
  $scope.viewPerZipCodeGraph=function(){
    $scope.invalidZipCode=false;
    if($scope.zip_1===undefined){
      $scope.invalidZipCode=true;
      $scope.invalidZipCodeMessage="Zip Code has to be in the format 12345";
    }
    zipcode=$scope.zip_1;
    var regExpNumber=/(\d{5})/;
    if(!regExpNumber.test(zipcode)){
      $scope.invalidZipCode=true;
      $scope.invalidZipCodeMessage="Zip Code has to be in the format 12345";
    }
    if($scope.invalidZipCode==false){
      zipcode=Number($scope.zip_1);
      var getZipCodeGraph={zipcode:zipcode};
      
      $http.post('/getZipCodeGraph',getZipCodeGraph).success(function(data){
        if(data.statusCode==200) {
          $scope.loadGraph_4=true;
          $scope.zipCodeGraphInput=[];
          var days=data.message;
           for(var i=0;i<days.length;i++){
           zipcodeGraphSubArray=[];
           zipcodeGraphSubArray[0]=days[i].billing_date.toString();
           zipcodeGraphSubArray[1]=days[i].rides;
            $scope.zipCodeGraphInput.push(zipcodeGraphSubArray);
            }
            $scope.loadGraph4=true;
        }else{
          $scope.invalidZipCode=true;
          $scope.invalidZipCodeMessage=data.message;
          }
      }).error(function(data){
        $scope.invalidZipCode=true;
        $scope.invalidZipCodeMessage="unexpected error";
      })
}
    
  }
  $scope.getPerCityGraph=function(){
    $scope.cityname=true;
  }
  
  $scope.viewPerCityGraph=function(){
    $scope.invalidCity=false;
    alert($scope.city);
   if($scope.city===undefined){
      $scope.invalidCity=true;
      $scope.invalidCityMessage="Invalid city name";
    }
    
    var regExpCharacter=/^[a-z A-Z]*$/;
    if(!regExpCharacter.test($scope.city)){
      $scope.invalidCity=true;
      $scope.invalidCityMessage="Invalid city name"
    }
    if($scope.invalidCity==false){
      var getCity_Graph={city:$scope.city};
      $http.post('/getCityGraph',getCity_Graph).success(function(data){
        if(data.statusCode==200) {
          $scope.loadGraph_5=true;
          $scope.cityGraphInput=[];
          var days=data.message;
           for(var i=0;i<days.length;i++){
           cityGraphSubArray=[];
            cityGraphSubArray[0]=days[i].billing_date.toString();
            cityGraphSubArray[1]=days[i].rides;
            $scope.cityGraphInput.push(cityGraphSubArray);
        }
            $scope.loadGraph5=true;
        }else{
          $scope.invalidCity=true;
          $scope.invalidCityMessage=data.message;
          }
      }).error(function(data){
        $scope.invalidCity=true;
        $scope.invalidCityMessage="Unexpected error";
      });
      
    }
  }
  
  $scope.getPerCustomerGraph=function(){
    $scope.perCustomer=true;
  }
  
  $scope.viewPerCustomerGraph=function(){
    $scope.invalidSSN=false;
    
    if($scope.ssn_id_1==undefined){
      $scope.invalidSSN=true;
      $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
    }
    ssn=$scope.ssn_id_1.concat($scope.ssn_id_2,$scope.ssn_id_3);
       var regExpNumber=/(\d{9})/;
       if(!regExpNumber.test(ssn) ){
            $scope.invalidSSN=true;
            $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
        }
     
      if($scope.invalidSSN==false){
        ssn=Number($scope.ssn_id_1+$scope.ssn_id_2+$scope.ssn_id_3);
        
        var getCustomerGraph={customerId:ssn};
     
        $http.post('/getCustomerGraph',getCustomerGraph).success(function(data){
      
          if(data.statusCode==200) {
            $scope.loadGraph_2=true;
            $scope.customerGraphInput=[];
            var days=data.message;
             for(var i=0;i<days.length;i++){
             customerGraphSubArray=[];
              customerGraphSubArray[0]=days[i].billing_date.toString();
              customerGraphSubArray[1]=days[i].rides;
              $scope.customerGraphInput.push(customerGraphSubArray);
             }
              $scope.loadGraph2=true;
          }else{
            $scope.invalidSSN=true;
            $scope.invalidSSNmessage=data.message;
          }
        }).error(function(data){
          $scope.invalidSSN=true;
          $scope.invalidSSNmessage="unexpected error";
        });
  }
  };
    
  $scope.getPerDriverGraph=function(){
   $scope.perDriver=true;
  }
  
  $scope.viewPerDriverGraph=function(){
    $scope.invalidSSN=false;
    if($scope.ssn_id_1==undefined){
      $scope.invalidSSN=true;
      $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
    }
    ssn=$scope.ssn_id_1.concat($scope.ssn_id_2,$scope.ssn_id_3);
    var regExpNumber=/(\d{9})/;
  
    if(!regExpNumber.test(ssn) ){
       $scope.invalidSSN=true;
       $scope.invalidSSNmessage="SSN has to be in the format 123-12-1234"
    }
     
    if($scope.invalidSSN==false){
       ssn=Number($scope.ssn_id_1+$scope.ssn_id_2+$scope.ssn_id_3);
       var getDriverGraph={driverId:ssn};
     
       $http.post('/getDriverGraph',getDriverGraph).success(function(data){
           if(data.statusCode==200) {
            $scope.loadGraph_3=true;
            $scope.driverGraphInput=[];
            var days=data.message;
             for(var i=0;i<days.length;i++){
            driverGraphSubArray=[];
             driverGraphSubArray[0]=days[i].billing_date.toString();
              driverGraphSubArray[1]=days[i].rides;
              $scope.driverGraphInput.push(driverGraphSubArray);
              }
              $scope.loadGraph3=true;
          }else{
            $scope.invalidSSN=true;
            $scope.invalidSSNmessage=data.message;
            }
        }).error(function(data){
          $scope.invalidSSN=true;
          $scope.invalidSSNmessage="unexpected error";
        })
  }
  };
  }).directive('revenue', function(){
    return {
      restrict: 'A',
      link: function(scope, elem, attrs){
        var myChart = new JSChart('graph', 'bar');
        myChart.setDataArray(scope.revenueGraphInput);
        myChart.setSize(500, 400);
        myChart.setTitle('Graph for revenue per day');
        myChart.setBarColor('#42aBdB');
        myChart.setBarOpacity(0.8);
        myChart.setBarValues(false);
        myChart.draw();
        
      }
  }
}).directive('customer', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      var myChart = new JSChart('graph', 'bar');
      myChart.setDataArray(scope.customerGraphInput);
      myChart.setSize(500, 400);
      myChart.setTitle('Graph for rides per customer per day');
      myChart.setBarColor('#42aBdB');
      myChart.setBarOpacity(0.8);
      myChart.setBarValues(false);
      myChart.draw();
      
    }
}
}).directive('driver', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      var myChart = new JSChart('graph', 'bar');
      myChart.setDataArray(scope.driverGraphInput);
      myChart.setSize(500, 400);
      myChart.setTitle('Graph for rides per driver per day');
      myChart.setBarColor('#42aBdB');
      myChart.setBarOpacity(0.8);
      myChart.setBarValues(false);
      myChart.draw();
      
    }
}
}).directive('zipcode', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      var myChart = new JSChart('graph', 'bar');
      myChart.setDataArray(scope.zipCodeGraphInput);
      myChart.setSize(500, 400);
      myChart.setTitle('Graph for rides per zipcode  per day');
      myChart.setBarColor('#42aBdB');
      myChart.setBarOpacity(0.8);
      myChart.setBarValues(false);
      myChart.draw();
      
    }
}
}).directive('city', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs){
      var myChart = new JSChart('graph', 'bar');
      myChart.setDataArray(scope.cityGraphInput);
      myChart.setSize(500, 400);
      myChart.setTitle('Graph for rides per city  per day');
      myChart.setBarColor('#42aBdB');
      myChart.setBarOpacity(0.8);
      myChart.setBarValues(false);
      myChart.draw();
      
    }
}
});

