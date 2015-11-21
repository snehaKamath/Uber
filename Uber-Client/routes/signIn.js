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
	
}

function driverSignIn(req, res)	{
	
}

