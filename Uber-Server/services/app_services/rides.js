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
	driverDAO.createBill(message,function(response){
	console.log('In creation of bill in ride js  at server sides ');
		console.log(response);
		callback(response);
	});	
}

function inprogress(message,callback){
driverDAO.inprogress(message,function(response){
	console.log(' In inprogress response ');
	console.log(response);
	callback(response);
});
	
}
function updatedriverreview(message,callback){
	
	ridesDAO.updatedriverreview(message,function(response){
		console.log('In here before making DAO call');
	});
}

function reviewcustomer(message,callback){
	
	driverDAO.reviewcustomer(message,function(response){
		console.log('In review customer response ');
		console.log(response);
		callback(response);
	});
	
}
function searchBill(message,callback){
	  var id=message.id; // id in ssn format
	  var type=message.reqType; //type of id.
	  console.log("making dao request ");
	  ridesDAO.searchBill(id,type,function(response){
	  callback(response);
	  })
	  
	}

function incompletereview(message,callback){
	console.log('checking for incomplete reviews b4 DAO ');
	ridesDAO.incompletereview(message,callback);
	
}



