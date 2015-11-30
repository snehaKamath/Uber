/**
 * http://usejsdoc.org/
 */
var driverDAO = require('../db_services/driverDAO');
var bcryptObject = require('./bcrypt'); 
var customerDAOObject=require('../db_services/customerDAO');

exports.handle_request = function(message, callback)	{
	console.log('This is reached at driver handle request');
	if(message.reqType === "createDriver")		{ 
		console.log('This is reached at driver handle request');
		createDriver(message, callback);		
	}
	
	if(message.reqType === "customerSignUp")		{
		customer(message, callback);
	}	
};

function createDriver(message, callback)	{
	console.log("Inside Sign Up Start");
	var driverid = message.data[0];
	var firstname = message.data[1];
	var lastname = message.data[2];
	var password = message.data[3];
	var email = message.data[4];
	var phone = message.data[5];
	var zip_primary = message.data[6];
	var zip_secondary = message.data[7];
	var address = message.data[8];
	var city = message.data[9];
	var state = message.data[10];
	var carbrand = message.data[11];
	var carnumber = message.data[12];
	var video = message.data[13];
	console.log("Inside Sign Up after fetch");

	driverDAO.createDriver( driverid, firstname, lastname, password, email,
			phone, zip_primary, zip_secondary, address, city, state, carbrand, carnumber, video, callback);
}

//Dont follow this way of implementation, I will refactor this code. If others also add same code then it will be  overhead for me...
function customer(message, callback)	{
	console.log("Inside Sign Up");
	var ssn=message.data[0]+message.data[1]+message.data[2];
	var firstname=message.data[3];
	var lastname=message.data[4];
	var address=message.data[5];
	var city=message.data[6];
	var state=message.data[7];
	var zip_primary=message.data[8];
	var zip_secondary=message.data[9];
	var phone="+"+message.data[10]+message.data[11];
	var email=message.data[12];
	var password=message.data[13];
	var ccnumber=message.data[14];
	var cctype=message.data[15];
	var cvv=message.data[16];
	var expiry=message.data[17]+"/"+message.data[18];
	var cardHolderName=message.data[19];
	var status=0;
	var myuser = [];
	var res={};
	var select_customerDetails_query="select * from customer where CUSTOMER_ID = ? OR PHONE_NUMBER=?";
	var params=[ssn,phone];
	console.log("after fetch");
	customerDAOObject.getCustomerDetails(select_customerDetails_query, params, function(results){
		console.log("after customer select query");
		if(results.length>0){
			res.code = "401";
			res.value="SSN or PhoneNumber already exists";
			callback(res);
		}
		else{
			var select_customerCredentials_query="select * from customer_credentials where EMAIL=?";
			var params=[email];
			customerDAOObject.getCustomerDetails(select_customerCredentials_query, params, function(results){
				console.log("after customer_credentials select query");
				if(results.length>0){
					res.code = "401";
					res.value="Email already exists";
					callback(res);
				}
				else{
					var insert_customer_query="insert into customer values(?,?,?,?,?,?,?,?,?)";
					var params=[ssn,firstname,lastname,address,city,zip_primary,zip_secondary,state,phone];
					customerDAOObject.insertCustomerDataToDatabase(insert_customer_query,params,function(result){
						console.log("after customer insert query");
						if(result){
							bcryptObject.encryption(password, function(hash) {
								var insert_customer_credentials_query="insert into customer_credentials values(?,?,?,?)";
								var params=[email,hash,ssn,status];
								customerDAOObject.insertCustomerDataToDatabase(insert_customer_credentials_query,params,function(result){
									if(result){
										bcryptObject.encryption(ccnumber, function(hash) {
											var insert_customer_credit_query="insert into creditcard values(?,?,?,?,?,?)";
											var params=[ssn,hash,cctype,expiry,cvv,cardHolderName];
											customerDAOObject.insertCustomerDataToDatabase(insert_customer_credit_query,params,function(result){
												if(result){
													res.code = "200";
													res.value="Successfully Created Account";
													console.log("Successfully created");
													callback(res);
												}
												else{
													var delete_customer_query="delete from customer_credentials where EMAIL=?";
													params=[email];
													customerDAOObject.deleteQuery(delete_customer_query, params, function(result) {
														//Delete from the customer where row has been inserted.
													});
													var params=[ssn];
													delete_customer_query="delete from customer where CUSTOMER_ID=?";
													customerDAOObject.deleteQuery(delete_customer_query, params, function(result) {
														//Delete from the customer table where row has been inserted.
													});
													res.code = "401";
													res.value="Error in inserting data";
													callback(res);
												}
											});
										});
									}
									else{
										var delete_customer_query="delete from customer where CUSTOMER_ID=?";
										var params=[ssn];
										customerDAOObject.deleteQuery(delete_customer_query, params, function(result) {
											//Delete the customer which has been inserted.
										});
										res.code = "401";
										res.value="Error in inserting data";
										callback(res);
									}
								});
							});
						}
						else{
							res.code = "401";
							res.value="Error in inserting data";
							callback(res);
						}
					});
				}
			});			
		}
	});		
}
