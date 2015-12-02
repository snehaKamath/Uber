var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.get('/getCustomerProfile',getCustomerProfile);
	app.post('/updateCustomerProfile',updateCustomerProfile);
	app.get('/getCurrentRide',getRideStatus);
};

function getCustomerProfile(req,res){
	console.log("In get Customer Profile");
	var ssn = req.session.customerId ;
	var msg_payload={'ssn':ssn,'reqType':'getCustomerProfile'};
	mq_client.make_request('customer_service_req_q',msg_payload, function(results){
		if(results.code==200){
			console.log("results received");
			res.send(results.value);
		}
		else{
			res.render("error");
		}
	});
}

function updateCustomerProfile(req,res){
	console.log("In Update Profile");
	var ssn = req.session.customerId;
	var customer_data=req.param("data");
	var msg_payload = {'data':customer_data,'ssn':ssn,'reqType':'updateCustomerDetails' };
	mq_client.make_request('customer_service_req_q',msg_payload, function(results){
		if(results.code==200){
			console.log("results received");
			res.send(results.value);
		}
		else{
			res.render("error");
		}
	});
}

function getRideStatus(req,res){
	console.log("in get ride status");
	var ssn=req.session.customerId;
	var msg_payload = {'ssn':ssn,'reqType':'getRideStatus'};
	mq_client.make_request('customer_service_req_q',msg_payload, function(results){
		if(results.code==200){
			console.log("results I am getting "+ JSON.stringify(results));
			console.log("results received"+results.value.RIDE_STATUS);
			res.send({status:200,value:results.value});
		}
		else{
			res.render("error");
		}
	});
}