var mysql = require('mysql');
var bcrypt = require('../app_services/bcrypt');

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
	      console.log(err);
	      var res;
	      if(rows.length >0){
	        bcrypt.decryption(password, rows[0].PASSWORD, function(response){
	          if(response == "success"){
	            res = {statusCode : 200, message : {customerID : rows[0].CUSTOMER_ID, email : rows[0].EMAIL, approvalStatus : rows[0].STATUS}};
	          }
	          else{
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
		query = mysql.format(query,params);
		console.log(query);
		var connection=connectDB();
		connection.query(query, function (err, rows, fields) {
			if(err){
				callback(null);
			}
			else{
				if(rows.length>0){
					callback(rows);
				}
				else{
					callback(null);
				}
			}
		});
};

exports.insertDataToDatabase=function(customer_id,firstname,lastname,address,city,zipcode_primary,zipcode_secondary,state,phone_number,email,password,status,cardnumber,cardtype,expirydate,cvv,cardholdername,callback){
	var firstInsertQuery="insert into customer values(?,?,?,?,?,?,?,?,?)";
	var params=[customer_id,firstname,lastname,address,city,zipcode_primary,zipcode_secondary,state,phone_number];
	var finalQuery=mysql.format(firstInsertQuery,params)+";";
	var secondInsertQuery="insert into customer_credentials values(?,?,?,?)";
	params=[email,password,customer_id,status];
	finalQuery+=mysql.format(secondInsertQuery,params)+";";
	var thirdInsertQuery="insert into creditcard values(?,?,?,?,?,?)";
	params=[customer_id,cardnumber,cardtype,expirydate,cvv,cardholdername];
	finalQuery+=mysql.format(thirdInsertQuery,params);
	var connection=connectDB();
	console.log(finalQuery);
	/*var query="CALL storeCustomerSignUpData('"+customer_id+"','"+firstname+"','"+lastname+"','"+address+"','"+city+"','"+zipcode_primary+"','"+zipcode_secondary+"','"+state+"','"+phone_number+"','"+email+"','"+password+"','"+status+"','"+cardnumber+"','"+cardtype+"','"+expirydate+"','"+cvv+"','"+cardholdername+")";
	var connection=connectDB();
	console.log(query);
	connection.query(query, function (err, rows, fields) {*/
	connection.query(finalQuery, function (err, rows, fields) {
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

exports.getCustomerProfileDetails=function(ssn,callback){
	var select_customer_query="select * from customer where customer_id="+ssn;
	var select_customer_credentials_query="select * from customer_credentials where customer_id="+ssn;
	var select_creditcard_query="select * from creditcard where customer_id="+ssn;
	var data={};
	console.log(select_customer_query+"\n"+select_customer_credentials_query);
	var connection=connectDB();
	connection.query(select_customer_query, function (err, rows, fields) {
		if(err){
			callback(null);
		}
		else{
			if(rows.length>0){
				data.firstName = rows[0].FIRSTNAME;
				data.lastName = rows[0].LASTNAME;
				data.address=rows[0].ADDRESS;
				data.city=rows[0].CITY;
				data.zipcode_primary=rows[0].ZIP_PRIMARY;
				data.zipcode_secondary=rows[0].ZIP_SECONDARY;
				data.phone=rows[0].PHONE_NUMBER;
				data.state=rows[0].STATE;
				connection.query(select_customer_credentials_query, function (err, rows, fields) {
					if(err){
						callback(null);
					}
					else{
						if(rows.length>0){
							data.email=rows[0].EMAIL;
							connection.query(select_creditcard_query, function (err, rows, fields) {
								if(err){
									callback(null);
								}
								else{
									if(rows.length>0){
										data.cardNumber=1234567890123456;
										data.cardType=rows[0].CARDTYPE;
										data.expiryDate=rows[0].EXPIRYDATE;
										data.cvv=rows[0].CVV;
										data.cardHolderName=rows[0].CARDHOLDERNAME;
										callback(data);
									}
									else{
										callback(null);
									}
								}
							});
						}
						else
							callback(null);
					}
				});
			}
			else{
				callback(null);
			}
		}
	});
};

exports.updateCustomerDetails=function(ssn,firstName,lastName,address,city,state,zipcode_primary,zipcode_secondary,phone,email,callback){
	var update_customer_query="update customer set FIRSTNAME=?,LASTNAME=?,ADDRESS=?,CITY=?,STATE=?,ZIP_PRIMARY=?,ZIP_SECONDARY=?,PHONE_NUMBER=? where CUSTOMER_ID=?";
	var params=[firstName,lastName,address,city,state,zipcode_primary,zipcode_secondary,phone,ssn];
	var finalQuery=mysql.format(update_customer_query,params)+";";
	var update_customer_credentials_query="update customer_credentials set EMAIL=? where CUSTOMER_ID=?";
	params=[email,ssn];
	finalQuery+=mysql.format(update_customer_credentials_query,params)+";";
	console.log(finalQuery);
	var connection=connectDB();
	connection.query(finalQuery, function (err, rows, fields) {
		if(rows){
			callback(rows);
		}
		else{
			callback(null);
		}
	});
};
