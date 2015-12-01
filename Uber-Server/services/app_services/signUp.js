/**
 * http://usejsdoc.org/
 */
var driverDAO = require('../db_services/driverDAO');
var bcryptObject = require('./bcrypt'); 
var customerDAO=require('../db_services/customerDAO');

exports.handle_request = function(message, callback)	{
	console.log('This is reached at driver handle request');
	if(message.reqType === "createDriver")		{ 
		console.log('This is create  at driver handle request');
		createDriver(message, callback);		
	}
	
	if(message.reqType === "customerSignUp")		{
		createCustomer(message, callback);
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
	bcryptObject.encryption(password, function(hash) {
		var hashedPassword=hash;
		driverDAO.createDriver( driverid, firstname, lastname, hashedPassword, email,
				phone, zip_primary, zip_secondary, address, city, state, carbrand, carnumber, video, callback);
	});
}

//Dont follow this way of implementation, I will refactor this code. If others also add same code then it will be  overhead for me...
function createCustomer(message, callback)	{
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
	customerDAO.getCustomerDetails(ssn,phone, function(results){
		if(results){
			if(ssn==results[0].CUSTOMER_ID){
				res.code = "401";
				res.value="SSN exists";
				callback(res);
			}
			else if(phone==results[0].PHONE_NUMBER){
				res.code = "401";
				res.value="Phone exists";
				callback(res);
			}
		}
		else{
			customerDAO.getCustomerCredentialsDetails(email,function(results){
				if(results){
					res.code = "401";
					res.value="Email exists";
					callback(res);
				}
				else{
					bcryptObject.encryption(password, function(hash) {
						var hashedPassword=hash;
						bcryptObject.encryption(cardnumber, function(hash) {
							var hashedCreditCardNumber=hash;
							customerDAO.insertDataToDatabase(ssn, firstname, lastname, address, city, zip_primary, zip_secondary, state, phone, email, hashedPassword, status, hashedCreditCardNumber, cardtype, expirydate, cvv, cardHolderName, function(result) {
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
