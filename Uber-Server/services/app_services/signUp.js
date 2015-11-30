/**
 * http://usejsdoc.org/
 */
var driverDAO = require('../db_services/driverDAO');
var bcryptObject = require('./bcrypt'); 
var customerDAOObject=require('../db_services/customerDAO');

exports.handle_request = function(message, callback)	{
	if(message.reqType === "createDriver")		{ 
		console.log('This is reached at driver handle request');
		driverDAO.createDriver(message,callback);
	}
	if(message.reqType === "customerSignUp")		{
		customer(message, callback);
	}	
};

//Dont follow this way of implementation, I will refactor this code. If others also add same code then it will be  overhead for me...
function customer(message, callback)	{
	var ssn=message.data[0]+message.data[1]+message.data[2];
	var firstname=message.data[3];
	var lastname=message.data[4];
	var address=message.data[5];
	var city=message.data[6];
	var state=message.data[7];
	var zip_primary=message.data[8];
	var zip_secondary=message.data[9];
	var phone=Number(message.data[10]);
	var email=message.data[11];
	var password=message.data[12];
	var cardnumber=message.data[13];
	var cardtype=message.data[14];
	var cvv=message.data[15];
	var expirydate=message.data[16]+"/"+message.data[17];
	var cardHolderName=message.data[18];
	var status=0;
	var myuser = [];
	var res={};
	var select_customerDetails_query="select * from customer where customer_id=? OR PHONE_NUMBER=?";
	var params=[ssn,phone];
	customerDAOObject.getCustomerDetails(select_customerDetails_query, params, function(results){
		if(results){
			res.code = "401";
			res.value="SSN or PhoneNumber already exists";
			callback(res);
		}
		else{
			var select_customerCredentials_query="select * from customer_credentials where email=?";
			var params=[email];
			customerDAOObject.getCustomerDetails(select_customerCredentials_query, params, function(results){
				if(results){
					res.code = "401";
					res.value="Email already exists";
					callback(res);
				}
				else{
					bcryptObject.encryption(password, function(hash) {
						var hashedPassword=hash;
						bcryptObject.encryption(cardnumber, function(hash) {
							var hashedCreditCardNumber=hash;
							customerDAOObject.insertDataToDatabase(ssn, firstname, lastname, address, city, zip_primary, zip_secondary, state, phone, email, hashedPassword, status, hashedCreditCardNumber, cardtype, expirydate, cvv, cardHolderName, function(result) {
								if(result){
									res.code = "200";
									res.value="Successfully Created Account";
									console.log("Successfully created");
									callback(res);
								}
								else{
									res.code = "401";
									res.value="Error in inserting data";
									callback(res);
								}
							});
						});
					});
				}
			});
			
		}
	});	
}
