/**
 * http://usejsdoc.org/
 */
var mq_client = require('../rpc/client');
module.exports = function (app)	{
	app.post('/adminSignIn', adminSignIn);	
	app.post('/customerSignIn', customerSignIn);
	app.post('/driverSignIn', driverSignIn);
};

function adminSignIn(req, res)	{
  var adminEmailid=req.body.adminEmailid;
  var adminPassword=req.body.adminPassword;
  var admin_signIn_details={adminEmailid:adminEmailid,adminPassword:adminPassword,reqType:"adminSignIn"};
  mq_client.make_request('signin_req_q',admin_signIn_details,function(results){
  if(results.status=="login successful"){
         req.session.adminEmailid=adminEmailid;
         req.session.adminId=results.adminId;
       }
         res.send(results);      
  });
}

function customerSignIn(req, res)	{
	var credentials = req.body;
	
	var message = {email : credentials.email, password : credentials.password, reqType : "customerSignIn"};
	
	if(credentials.email == undefined || credentials.password == undefined ){
	      var json_responses = {"statusCode" : 401, message : "email and password cannot be empty"};
		  res.send(json_responses);
	}
	
	if(credentials.email.length  > 24 || credentials.password.length > 24){
		var json_responses = {"statusCode" : 401, message : "length cannot be greater than 24"};
		res.send(json_responses);		
	}
	
	console.log('Making client request');
	
	mq_client.make_request('signin_req_q',message, function(data){
			
			if(data.statusCode == 200){
				
				if(data.message.approvalStatus == 0)
					res.send({statusCode : 401, message : "Request not yet Approved"});
				req.session.customerId = data.message.customerID;
				req.session.email = data.message.email;
				json_responses = {statusCode : 200, message : "success"};
				res.send(json_responses);
				
			}
			else
			{
				json_responses = {statusCode : 401, message : data.message};
				res.send(json_responses);
			} 		 
	 });
}

function driverSignIn(req, res)	{
	credentials = req.body;
	
	message = {email : credentials.email, password : credentials.password, reqType : "driverSignIn"};
	
	if(credentials.email == undefined || credentials.password == undefined ){
	      json_responses = {"statusCode" : 401, message : "email and password cannot be empty"};
			res.send(json_responses);
	}
	
	if(credentials.email.length  >24 || credentials.password.length > 24){
		json_responses = {"statusCode" : 401, message : "length cannot be greater than 24"};
		res.send(json_responses);
		
	}
	mq_client.make_request('signin_req_q',message, function(data){
			
			if(data.statusCode == 200){
				
				if(data.message.approvalStatus == 0)
					res.send({statusCode : 401, message : "Request not yet Approved"});
				req.session.driverId = data.message.driverID;
				req.session.email = data.message.email;
				json_responses = {statusCode : 200, message : "success"};
				res.send(json_responses);
				
			}
			else
			{
				json_responses = {statusCode : 401, message : data.message};
				res.send(json_responses);
			} 
		 
	 });
}

