/**
 * New node file
 */
driverDAO = require('../db_services/driverDAO');

exports.handle_request = function(message, callback)	{
	if(message.reqType === "driverLocations")		{ 
		getDriverLocation(message, callback);
	}
	if(message.reqType === "reviewDriver")		{ 
		reviewDriver(message, callback);
	}
	if(message.reqType === "getDriverReviews")		{ 
		getDriverReviews(message, callback);
	}
};

function getDriverLocation(message, callback){
	console.log("In service");
	
	   location = [Number(message.pickupLng), Number(message.pickupLat)];
	   console.log(location);
		driverDAO.getDriverLocation(location, function(response){

			callback(response);
	});			
}

function reviewDriver(message, callback){
	console.log("sending review Driver data in driver Service");
	  console.log(message);
		driverDAO.reviewDriver(message.rating, message.comments, message.rideId, message.driverId, message.customerId, function(response){

			callback(response);
	});			
}

function getDriverReviews(message, callback){
	console.log("sending review Driver data in driver Service");
	  console.log(message);
		driverDAO.getDriverReviews(message.driverId,  function(response){

			callback(response);
	});			
}

