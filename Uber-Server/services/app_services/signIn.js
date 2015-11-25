driverDAO = require('../db_services/driverDAO');
customer = require('../db_services/customerDAO');
var mysql=require('mysql');
 var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'uber'
   });
connection.connect();
   
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


function adminSignIn(message,callback){
  
  adminEmailid=message.adminEmailid;
  adminPassword=message.adminPassword;
  
  res={};
  query = connection.query('SELECT * from admin where USERNAME= ?', [ adminEmailid], function(err, rows, fields) {
         
         if (!err) {
            if (rows.length==1) {
              result=rows[0];
              if(result["PASSWORD"]==adminPassword){
                 adminId=result["ADMIN_ID"];
                 res.status="login successful";
                 res.adminId=adminId;
                 }
              else{
                res.status="invalid password";
                }
          }
            else {
              res.status="invalid username";
              }
         }
         else {
           res.status=err;
           }
         callback(res);
  });
  console.log(query.sql);
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
