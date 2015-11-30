/**
 * http://usejsdoc.org/
 */
var mq_client= require('../rpc/client');

module.exports = function (app)	{
	app.post('/adminSignUp', adminSignUp);	
	app.post('/customerSignUp', customerSignUp);
	app.post('/driverSignUp', driverSignUp);
};

function adminSignUp(req, res)	{
	
}

function customerSignUp(req, res)	{
	var customer_data=req.param("data");
	var msg_payload = {'data':customer_data, 'reqType' : 'customerSignUp' };
	mq_client.make_request('signup_req_q',msg_payload, function(results){
		if(results){
			if(results.code=="401"){
				res.send({"status":"fail" , 'msg': results.value});
			}
			else{
				res.send({"status":"success" , 'msg': 'Successfully inserted'});
			}
		}
		else{
			res.send({"status":"fail" , 'msg': 'error'});
		}
	});	
}

function driverSignUp(req, res)	{
	req.body.reqType = "createDriver";
	console.log("Inside Sign Up - before rabbitmq");
	//var msg_payload = {'data':req.param("data"), 'reqType' : 'createDriver' };
	mq_client.make_request('signup_req_q', req.body, function(response){
		console.log(response);
		res.send(response);
	});	
}

