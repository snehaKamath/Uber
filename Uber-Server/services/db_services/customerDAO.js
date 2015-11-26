var mysql = require('mysql');

function connectDB(){
	  var connection = mysql.createConnection({
	        host: '127.0.0.1',
	        user: 'root',
	        password : '',
	        database : 'uber',
	        multipleStatements : true
	    });

	    connection.connect(function (err) {
	    
	        if (err) { throw err; }

	    });
	    return connection;
	}
 
exports.validateCustomer = function(email, password, callback){
	 
	  var connection = connectDB();
	  var query = "select * from customer_credentials where  email = "+connection.escape(email);
	  
	    connection.query(query, function (err, rows, fields) {
	  
	      if(rows.length >0){
	        bcrypt.decryption(password, rows[0].PASSWORD, function(response){
	          if(response == "success"){
	            response = {statusCode : 200, message : {customerID : rows[0].CUSTOMER_ID, email : rows[0].EMAIL, approvalStatus : rows[0].STATUS}};
	          }
	          else{
	            response = {statusCode : 401, message : "Passwords do not match"};
	          }
	          callback(response);	            	          
	        });
	      }else	{
	          res = {statusCode : 401, message : "Invalid Email"};
	      	  callback(response);	    	  
	      }
	    });
};
	
exports.getCustomerDetails = function(query,params,callback){
		query = mysql.format(query,params);
		console.log(query);
		var connection=connectDB();
		connection.query(query, function (err, rows, fields) {
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
		query = mysql.format(query,params);
		console.log(query);
		var connection=connectDB();
		connection.query(query, function (err, rows, fields) {
			if(rows){
				callback(rows);
			}
			else{
				callback(null);
			}
		});
};

exports.deleteQuery = function(query,params,callback){
		query = mysql.format(query,params);
		console.log(query);
		var connection=connectDB();
		connection.query(query, function (err, rows, fields) {
			if(rows){
				callback(rows);
			}
			else{
				callback(null);
			}
		});
};