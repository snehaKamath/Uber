ridesDAO = require('../db_services/ridesDAO');
exports.handle_request = function(message, callback)	{
	console.log(message);
	if(message.reqType === "createRide"){ 
		createRide(message, callback);
	}
	if(message.reqType === "getCustomerRidesHistory"){ 
		
		getCustomerRidesHistory(message, callback);
	}
	if(message.reqType === "searchBill_billid" || message.reqType== "searchBill_customerId" || message.reqType=="searchBill_driverId" )   { 
	    searchBill(message,callback);
	 }
	if(message.reqType === "getPendingReview"){ 
		getPendingReview(message, callback);
	}
	if(message.reqType === "updateCustomerRide"){ 
		console.log("its an update customer module ride");
		updateCustomerRide(message, callback);
	}
	if(message.reqType === "deleteCustomerRide"){ 
		console.log("its an update customer module ride");
		deleteCustomerRide(message, callback);
	}
};

function createRide(message, callback){

		ridesDAO.createRide(message.rideData, message.locations, function(response){

			callback(response);
	});			
};

function deleteCustomerRide(message, callback){
	console.log("message received at server"+message.rideId);
	ridesDAO.deleteCustomerRide(message.rideId, function(response){
		callback(response);
	});			
};

function updateCustomerRide(message,callback){
	console.log("rabbit mq received");
	
	ridesDAO.updateCustomerRide(message.rideData, message.ssn, message.locations, message.rideId, function(response){
		callback(response);
	});
}



function searchBill(message,callback){
	  var id=message.id; // id in ssn format
	  var type=message.reqType; //type of id.
	  var count = Number(message.count);
	  console.log("making dao request ");
	  ridesDAO.searchBill(id, type, count, function(response){
	  callback(response);
	  })
	  
}

function getPendingReview(message,callback){
	  var id=message.Id;
	  console.log("making dao request ");
	  console.log(message.Id);
	  ridesDAO.getPendingReview(id, function(response){
	  callback(response);
	  })
	  
}

