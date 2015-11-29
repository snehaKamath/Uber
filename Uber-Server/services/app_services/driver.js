/**
 * New node file
 */
driverDAO = require('../db_services/driverDAO');

exports.handle_request = function(message, callback)	{
	if(message.reqType === "driverLocations")		{ 
		getDriverLocation(message, callback);
	}
};

function getDriverLocation(message, callback){
	console.log("In service");
	
	 // message.pickupLng = '80.79567559999998'; 
	  //message.pickupLat = '16.5271931';
	   location = [Number(message.pickupLng), Number(message.pickupLat)];
	   console.log(location);
		driverDAO.getDriverLocation(location, function(response){

			callback(response);
	});			
}

