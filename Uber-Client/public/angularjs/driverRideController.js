uberApp = angular.module('uberApp');
uberApp.controller("driverRideController",function($scope, $state, $http, $window, $interval){
$scope.show=true;	
console.log('Inside driver ride controller');
$http.get('/driverincompletereview').success(function(data){
console.log(data);
	if(data.length)
		{
	$scope.flag1=0;
	$scope.flag2=0;
	$scope.flag3=0;
	$scope.flag4=4;
	$scope.cust_id=data[0].CUSTOMER_ID;
	$scope.bill_amount=data[0].bill_amount;
	$scope.ride_id=data[0].RIDE_ID;
		}
	else
		{
		$scope.flag1=1;
		$scope.flag2=0;
		$scope.flag3=0;
		$scope.flag4=0;
		
		}
	
});


$interval(function(){$http.get('/getriderequest').success(function(data){
	console.log(data);
	var cust=data.msg.message;
	//console.log('This is the final obtained after fetch');
	//console.log(cust);
	if(cust!== undefined)
		{
	$scope.show=false;	
	$scope.ride_id=cust.ride_id;
	$scope.cust_id=cust.customer_id;
	$scope.cust_fname=cust.firstname;
	$scope.cust_lname=cust.lastname;
	$scope.cust_city=cust.source_city;
	$scope.cust_zipcode=cust.source_zipcode;
	$scope.cust_phone=cust.phone_number;
	$scope.cust_location=cust.source_location;
	$scope.destination_location=cust.destination_location;
	$scope.destination_street=cust.destination_street;
	$scope.destination_zipcode=cust.destination_zipcode;
	$scope.destination_city=cust.destination_city;
	$scope.distance=cust.distance;
		}

})},6000);
	
$scope.accept=function(){
	$scope.flag1=0;
	$scope.flag2=1;
	$scope.flag3=0;
	$scope.flag4=0;	
};
	
$scope.showbill=function(){
	$scope.flag1=0;
	$scope.flag2=0;
	$scope.flag3=1;
	$scope.flag4=0;	
	
};
$scope.givereview=function(){
	$scope.flag1=0;
	$scope.flag2=0;
	$scope.flag3=0;
	$scope.flag4=1;	
	
};

$scope.start=function(){
	console.log($scope.cust_id);
	var currentTime = new Date();
    d=currentTime.getDate();
    m=currentTime.getMonth()+1;
    y=currentTime.getFullYear();
    hour = currentTime.getHours();
    min  = currentTime.getMinutes();
    sec  = currentTime.getSeconds();
	//console.log(d);
	//console.log(hour);
	//console.log(min);
	//console.log(sec);
    $scope.starttimestamp=y+"-"+m+"-"+d+" "+ hour + ":" + min + ":" + sec;
    console.log($scope.ride_id);
    var formdata={ride_id:$scope.ride_id,ride_status:1};
   $http.post('/rideinprogress',formdata).success(function(data){
	  console.log(data); 
   });
    console.log($scope.starttimestamp);
};

$scope.end=function()
{
	
	var currentTime = new Date();
    d=currentTime.getDate();
    m=currentTime.getMonth()+1;
    y=currentTime.getFullYear();
    hour = currentTime.getHours();
    min  = currentTime.getMinutes();
    sec  = currentTime.getSeconds();
	//console.log(d);
	//console.log(hour);
	//console.log(min);
	//console.log(sec);
	//console.log(d+"-"+m+"-"+y+" "+ hour + ":" + min + ":" + sec);
	$scope.endtimestamp=y+"-"+m+"-"+d+" "+ hour + ":" + min + ":" + sec;
	console.log($scope.endtimestamp);
	var formdata={ride_id:$scope.ride_id,BILLING_DATE:y+"-"+m+"-"+d,pickup_time:$scope.starttimestamp,drop_time:$scope.endtimestamp,status:2,distance:$scope.distance};
	console.log(formdata);
	$http.post('/createBill',formdata).success(function(data)
			{
		console.log('Reached back');
		console.log($scope.cust_id);
		console.log(data);
		$scope.bill_amount=Math.round(data.msg.bill_amount*100)/100;
		console.log($scope.bill_amount);
		console.log()
		$scope.duration=data.msg.duration;
		console.log($scope.duration);
		//$state.go('billDetails',{location: false});
		// $state.transitionTo ('billDetails', {}, { location: false, inherit: true, relative: $state.$current, notify: true })
		
	});
	$scope.flag1=0;
	$scope.flag2=0;
	$scope.flag3=1;
	$scope.flag4=0;	
};

$scope.submittedreview=function()
{
console.log($scope.ratingg);
console.log($scope.review);
console.log($scope.cust_id);
console.log($scope.ride_id);
var formdata={customer_id:$scope.cust_id,rating:$scope.ratingg,review:$scope.review};
console.log(formdata);
$http.post('/reviewcustomer',formdata).success(function(data){
	console.log(data);
});
$http.post('/updatedriverreview',{ride_id:$scope.ride_id}).success(function(data){
	
});
window.location.assign("home");
};
	


});