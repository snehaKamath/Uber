ridesDAO = require('../db_services/ridesDAO');
exports.handle_request = function(message, callback)	{
	console.log(message);
	if(message.reqType === "createRide"){ 
		createRide(message, callback);
	}
	if(message.reqType === "getCustomerRidesHistory"){ 
		
		getCustomerRidesHistory(message, callback);
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

