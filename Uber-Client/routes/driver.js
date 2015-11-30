var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.get('/getDriverLocations/:lat/:lng', getDriverLocations);
//Define routes here, refer to signIn.js file for example
	app.get('/getDriverProfile',getDriverProfile);
	app.post('/updateDriverProfile',updateDriverProfile);
};

function getDriverProfile(req,res){
	var ssn=req.session.driverId;
	console.log(ssn);
	var msg_payload={'ssn':ssn,'reqType':'getDriverProfile'};
	mq_client.make_request('driver_service_req_q',msg_payload, function(results){
		if(results.code==200){
			console.log("results received");
			res.send(results.value);
		}
		else{
			res.render("error");
		}
	});
}

function getDriverLocations(req, res){
	
	var latitude=req.params.lat;
	  var longitude=req.params.lng;
	  var message={pickupLat : latitude,pickupLng : longitude,reqType:"driverLocations"};
	  mq_client.make_request('driver_service_req_q',message,function(results){
	  
	         res.send(results);     
	  });
	
	
	
}
function updateDriverProfile(req,res){
	var ssn=req.session.driverId;
	var customer_data=req.param("data");
	var msg_payload = {'data':customer_data,'ssn':ssn,'reqType':'updateDriverDetails' };
	mq_client.make_request('driver_service_req_q',msg_payload, function(results){
		if(results.code==200){
			console.log("results received");
			res.send(results.value);
		}
		else{
			res.render("error");
		}
	});
}

