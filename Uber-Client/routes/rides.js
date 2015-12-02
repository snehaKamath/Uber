var mq_client = require('../rpc/client');

module.exports = function (app)	{
	app.put('/createRide', createRide);
	app.get('/getCustomerRidesHistory/:count', searchBill);
	app.get('/getPendingReview', getPendingReview);
	app.post('/updateCustomerRide',updateCustomerRide);
	app.post('/deleteCustomerRide',deleteCustomerRide);
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

function deleteCustomerRide(req,res){
	var rideId=req.param("rideId");
	console.log("ride id is"+rideId+"Sending the message to server");
	var message={"rideId" : rideId, reqType:"deleteCustomerRide"};
	mq_client.make_request('rides_service_req_q',message,function(results){
		console.log(results);
        res.send(results);     
	});	
}

 function searchBill(req,res){
	 
	  if(req.session.customerId){ // for currently logged in customer's ride history
	    var searchBill_msg={id : req.session.customerId, count : Number(req.params.count), reqType:"searchBill_customerId"}
	  }else if(req.session.driverId){ // for currently logged in driver's ride history
	    var searchBill_msg={id:req.session.driverId, count : Number(req.params.count), reqType:"searchBill_driverId"}  
	  }else if(req.body.idType=="Customer ID"){    //below statements are for post request
	    var searchBill_msg={id:req.body.id,reqType:"searchBill_customerId"}
	  }else if(req.body.idType=="Driver ID"){
	    var searchBill_msg={id:req.body.id,reqType:"searchBill_driverId"}
	  }else if(req.body.idType=="Bill ID"){
	    var searchBill_msg={id:req.body.id,reqType:"searchBill_billid"}
	  } else{
	    res.send({statusCode:401,message:"ID is undefined"});
	  }
	  mq_client.make_request('rides_service_req_q',searchBill_msg,function(results){
	    res.send(results);
	    });
	  
}

function getPendingReview(req, res){
	
	customerId = req.session.customerId;
	
	message = {Id : customerId, reqType : "getPendingReview"};
	mq_client.make_request('rides_service_req_q',message,function(results){
		  
        res.send(results);     
});	
	
}

function updateCustomerRide(req,res){
	console.log("in Update customer ride client");
	var ssn=req.session.customerId;
	rideData = req.body.rideData;
	locations = req.body.locations;
	rideId = req.body.rideId;
	console.log(JSON.stringify(rideData));
	console.log(JSON.stringify(locations));
	var msg_payload = {"ssn":ssn, "rideData" : rideData, "locations" : req.body.locations, "rideId" : rideId, "reqType":"updateCustomerRide"};
	console.log("MESSAGE PAYLOAD IS "+JSON.stringify(msg_payload));
	mq_client.make_request('rides_service_req_q',msg_payload, function(results){

			res.send(results);
	});
}