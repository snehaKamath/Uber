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
	
}

function driverSignUp(req, res)	{
	req.body.reqType="createDriver";
	mq_client.make_request('signup_req_q', req.body, function(response){
		console.log(response);
		res.send(response);
	});
	
}

