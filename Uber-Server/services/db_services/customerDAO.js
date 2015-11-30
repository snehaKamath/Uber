var bcrypt = require('../app_services/bcrypt');

exports.validateCustomer = function(email, password, callback){
	 
	  var query = "select * from customer_credentials where  email =  ? ";	  
	    mysql_pool.query(query, [email], function (err, rows, fields) {
	  
	      var res;
	      if(rows.length >0){
	        bcrypt.decryption(password, rows[0].PASSWORD, function(response){
	          if(response === "success")	{
	            res = {statusCode : 200, message : {customerID : rows[0].CUSTOMER_ID, email : rows[0].EMAIL, approvalStatus : rows[0].STATUS}};
	          }
	          else	{
	            res = {statusCode : 401, message : "Passwords do not match"};
	          }
	          callback(res);	            	          
	        });
	      }else	{
	          res = {statusCode : 401, message : "Invalid Email"};
	      	  callback(res);	    	  
	      }
	    });
};
	
exports.getCustomerDetails = function(query,params,callback){
	mysql_pool.query(query, params, function (err, rows, fields) {
		if(err){
			callback(null);
		}
		else{
			if(rows>0){
				callback(null);
			}
			else{
				callback(rows);
			}
		}
	});
};

exports.insertCustomerDataToDatabase = function(query, params, callback){		
		mysql_pool.query(query, params, function(err, rows, fields) {
			if(rows){
				callback(rows);
			}
			else{
				callback(null);
			}
		});
};

exports.deleteQuery = function(query, params, callback){
		mysql_pool.query(query, params, function (err, rows, fields) {
			if(rows){
				callback(rows);
			}
			else{
				callback(null);
			}
		});
};