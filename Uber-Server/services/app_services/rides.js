ridesDAO = require('../db_services/ridesDAO');
exports.handle_request = function(message, callback)	{
	console.log(message);
	if(message.reqType === "createRide"){ 
		createRide(message, callback);
	}
	if(message.reqType === "getCustomerRidesHistory"){ 
		
		getCustomerRidesHistory(message, callback);
	}
if(message.reqType ==="updatedriverreview"){
		
		updatedriverreview(message,callback);
	}
	if(message.reqType ==="createBill"){
		
		createBill(message,callback)
	}
	if(message.reqType === "searchBill_billid" || message.reqType== "searchBill_customerId" || message.reqType=="searchBill_driverId" )   { 
	    searchBill(message,callback);
	   }
	
	if(message.reqType==="inprogress"){
		console.log('Here in inprogress server side rides');
		inprogress(message,callback);
		
	}
	if(message.reqType==="reviewcustomer")
		{
	     console.log('Here in the review customer from server side ');	
		reviewcustomer(message,callback);
		}
	if(message.reqType==="incompletereview")
		{
		 console.log('Here in server side to check the incomplete reviews b4 DAO block ');
		 incompletereview(message,callback);
		}
};

function createRide(message, callback){

		ridesDAO.createRide(message.rideData, message.locations, function(response){

			callback(response);
	});			
};

function getCustomerRidesHistory(message, callback){

		ridesDAO.getCustomerRides(message.count, function(response){

			callback(response);
	});			
};

function createBill(message,callback)
{
	
	console.log('below are the things we  need to refractor ');
	ride_id=message.message.ride_id;
	billing_date=message.message.BILLING_DATE;
	pickup_time=message.message.pickup_time;
	drop_time=message.message.drop_time;
	status=message.message.status;
	distance=message.message.distance;
	driverDAO.createBill(ride_id,billing_date,pickup_time,drop_time,status,distance,function(response){
	console.log('In creation of bill in ride js  at server sides ');
		console.log(response);
		callback(response);
	});	
}

function inprogress(message,callback){
	ride_id=message.ride_id;
	ride_status=message.ride_status;
	console.log('Here in progress ');
	console.log(ride_id);
	ride_status=1;
driverDAO.inprogress(ride_id,ride_status,function(response){
	console.log(' In inprogress response ');
	console.log(response);
	callback(response);
});
	
}
function updatedriverreview(message,callback){
	console.log('THis is point for refractorrr in update review status of driver ');
	console.log(message);
	ride_id=message.ride_id.ride_id;
	ridesDAO.updatedriverreview(ride_id,function(response){
		console.log('In here before making DAO call');
	});
}

function reviewcustomer(message,callback){
	console.log('Here in the review customer b4 passing where we have to refractor');
	driver_id=message.driver_id;
	customer_id=message.message.customer_id;
	rating=message.message.rating;
	review=message.message.review;
	driverDAO.reviewcustomer(driver_id,customer_id,rating,review,function(response){
		console.log('In review customer response ');
		console.log(response);
		callback(response);
	});
	
}
function searchBill(message,callback){
	  var id=message.id; // id in ssn format
	  var type=message.reqType; //type of id.
	  var count = Number(message.count);
	  console.log("making dao request ");
	  ridesDAO.searchBill(id,type,count,function(response){
	  callback(response);
	  })
	  
	}

function incompletereview(message,callback){
	console.log('message to be passed to incomplete review refractor ');
	console.log(message);
	driver_id=message.id;
	//customer_id=message.message.customer_id;
	//rating=message.message.rating;
	//review=message.message.review;
	console.log('checking for incomplete reviews b4 DAO ');
	ridesDAO.incompletereview(driver_id,callback);
	
}



