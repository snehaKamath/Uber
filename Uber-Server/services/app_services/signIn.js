driverDAO = require('../db_services/driverDAO');
customer = require('../db_services/customerDAO');
var mysql=require('mysql');

   
exports.handle_request=function(message,callback){

	console.log("In handle_request"+message.reqType);
  if(message.reqType == "adminSignIn"){
  adminSignIn(message,callback);
  }
  if(message.reqType == "driverSignIn"){
	  driverSignIn(message,callback);
	}
  if(message.reqType == "customerSignIn"){
	  customerSignIn(message,callback);
	}
}


function adminSignIn(message, callback) {

	  adminEmailid = message.adminEmailid;
	  adminPassword = message.adminPassword;
      adminDAO.validateAdmin(adminEmailid, adminPassword, function(response) {
	    callback(response);

	  })
	}

function driverSignIn(message,callback){
	  	
		driverDAO.validateDriver(message.email, message.password, function(response){
			callback(response);
	});		
}
function customerSignIn(message,callback){
  	
	customer.validateCustomer(message.email, message.password, function(response){
		callback(response);
});		
}
