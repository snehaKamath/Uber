var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.get('/getDriverLocations/:lat/:lng', getDriverLocations);
	app.post('/reviewDriver', reviewDriver);
	app.get('/getDriverReviews/:driverId', getDriverReviews);
};

function getDriverLocations(req, res){
	
	var latitude=req.params.lat;
	  var longitude=req.params.lng;
	  var message={pickupLat : latitude,pickupLng : longitude,reqType:"driverLocations"};
	  mq_client.make_request('driver_service_req_q',message,function(results){
	  
	         res.send(results);     
	  });
	
	
	
}

function reviewDriver(req, res){
	
	  var message={rating : req.body.rating, comments : req.body.comments, rideId : req.body.rideId, driverId : req.body.driverId, customerId : req.session.customerId, reqType:"reviewDriver"};
	  console.log("sending review Driver data");
	  mq_client.make_request('driver_service_req_q',message,function(results){
	  
	         res.send(results);     
});

}

function getDriverReviews(req, res){
	
	  var message={driverId : Number(req.params.driverId),  reqType:"getDriverReviews"};
	  console.log("sending review Driver data");
	  mq_client.make_request('driver_service_req_q',message,function(results){
	  
	         res.send(results);     
});
}