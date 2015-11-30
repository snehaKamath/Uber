var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.get('/getDriverLocations/:lat/:lng', getDriverLocations);
};

function getDriverLocations(req, res){
	
	var latitude=req.params.lat;
	  var longitude=req.params.lng;
	  var message={pickupLat : latitude,pickupLng : longitude,reqType:"driverLocations"};
	  mq_client.make_request('driver_service_req_q',message,function(results){
	  
	         res.send(results);     
	  });
	
	
	
}