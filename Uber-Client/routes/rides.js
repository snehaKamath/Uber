var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.put('/createRide', createRide);
	app.get('/getCustomerRidesHistory/:count', getCustomerRidesHistory);
};

function createRide(req, res){
	console.log("Request Body "+JSON.stringify(req.body));
	req.body.rideData.customer_id = req.session.customerId;
	rideData = req.body.rideData;
	locations = req.body.locations;
	console.log(JSON.stringify(rideData));
	console.log(JSON.stringify(locations));
	  var message={"rideData" : rideData, "locations" : req.body.locations, reqType:"createRide"};
	  mq_client.make_request('rides_service_req_q',message,function(results){
	  
	         res.send(results);     
	});	  
}

function getCustomerRidesHistory(req, res){
	
	  var message={ count : req.params.count, reqType:"getCustomerRidesHistory"};
	  mq_client.make_request('rides_service_req_q',message,function(results){
	  
	         res.send(results);     
	});	  
}