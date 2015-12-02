var bcrypt = require('../app_services/bcrypt');
var mysql = require('mysql');    //Use this only for format
 
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
	console.log(finalQuery);
	mysql_pool.query(finalQuery, function (err, rows, fields) {
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
		mysql_pool.query(query, function (err, rows, fields) {
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
	mysql_pool.query(select_customer_query, function (err, rows, fields) {
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
				mysql_pool.query(select_customer_credentials_query, function (err, rows, fields) {
					if(err){
						callback(null);
					}
					else{
						if(rows.length>0){
							data.email=rows[0].EMAIL;
							mysql_pool.query(select_creditcard_query, function (err, rows, fields) {
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
	mysql_pool.query(finalQuery, function (err, rows, fields) {
		if(rows){
			callback(rows);
		}
		else{
			callback(null);
		}
	});
};

exports.getRideStatus=function(ssn,callback){
	console.log("In Server get ride status");
	var get_rideStatus_query="select r.*,d.FIRSTNAME as dfname, d.LASTNAME as dlname from rides r, driver d where d.driver_id = r.driver_id and customer_id=? ORDER BY REQUESTED_TIME DESC LIMIT 1";
	console.log(ssn);
	var params=[ssn];
	mysql_pool.query(get_rideStatus_query,params, function (err, rows, fields) {
		console.log(err);
		console.log("Ride Status "+rows);
		if(rows.length > 0){
			 if(rows[0].SOURCE_ZIPCODE != null)
		    	  rows[0].SOURCE_ZIPCODE = Number(rows[0].SOURCE_ZIPCODE);
		    	  else
		    		  rows[0].SOURCE_ZIPCODE = "";
		    	  
		    	  if(rows[0].DESTINATION_ZIPCODE != null)
			    	  rows[0].DESTINATION_ZIPCODE = Number(rows[0].DESTINATION_ZIPCODE);
			    	  else
			    		  rows[0].DESTINATION_ZIPCODE = "";
		    	  
		    	  source_address = rows[0].SOURCE_STREET+","+rows[0].SOURCE_AREA+","+rows[0].SOURCE_CITY+","+rows[0].SOURCE_STATE+" "+rows[0].SOURCE_ZIPCODE;
		    	  source_address = source_address.replace(",,",",");
		    	  
		    	  destination_address = rows[0].DESTINATION_STREET+","+rows[0].DESTINATION_AREA+","+rows[0].DESTINATION_CITY+","+rows[0].DESTINATION_STATE+" "+rows[0].DESTINATION_ZIPCODE;
		    	  destination_address = destination_address.replace(",,",",");
		    	  
		    	  if(source_address.charAt(0) == ",")
		    		  rows[0].source_address =   source_address.slice(1,source_address.length);
		    	  
		    	  if(destination_address.charAt(0) == ",")
		    		  rows[0].destination_address =   destination_address.slice(1,destination_address.length);
			callback(rows);
		}
		else{
			callback(null);
		}
	});
};