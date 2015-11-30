/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient; 
var bcrypt = require('../app_services/bcrypt');
var mongoHandler = require('./mongoHandler');

exports.validateDriver = function(email, password, callback){
 
  var query = "select * from driver_credentials where  email = ?";
  
    mysql_pool.query(query, [email], function(err, rows, fields) {
  
      var res;
      if(rows.length >0){
        bcrypt.decryption(password, rows[0].PASSWORD, function(response){
          if(response == "success"){
            res = {statusCode : 200, message : {driverID : rows[0].DRIVER_ID, email : rows[0].EMAIL, approvalStatus : rows[0].STATUS}};            
          }
          else{
            res = {statusCode : 401, message : "Passwords do not match"};            
          }
      	  callback(res);
        });
      }
      else{
        res = {statusCode : 401, message : "Invalid Email"};
    	callback(res);
      }    
    });
};

exports.createDriver=function(message,callback)
{
	console.log(message);	
	console.log('In create driver database object');	
	
	var insert_query = "INSERT INTO driver VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var params = [ driverid, firstname, lastname, address, city, zip_primary, state, phonenumber, zip_secondary ];
	
	var query = mysql_pool.query(insert_query, params, function (err, rows, fields) {
			if(err)
				{
					console.log(err);
					response = {statusCode : 401, message : "exist"};
					callback(response);
				}
			if(!err)
				{
					var insert_query = "INSERT INTO driver_credentials values(?, ?, ?, ?)";
					var params = [ email, password,  driverid, 0 ];
					
					var query = mysql_pool.query(insert_query, params, function(err,rows,fields){
						var response;
							if(err)
								{
									response = {statusCode : 401, message : "failure"};
									callback(response);
								}
							if(!err)
								{
									response = {statusCode : 200, message : "success"};								
									var qry={"_id": driverid, "reviews":[], "video" : video, location:[], "car":{"brand":carbrand, "number" : carnumber}};
									mongoHandler.insert("driver", qry, function(err, res)	{
										var response;
										if(err)	{
											response = {statusCode : 401, message : "Passwords do not match"};
										}
										else	{
											response = {statusCode : 200, message : "success"};
										}
										callback(response);
									});											
								}						
							});
					console.log(query);
				}	
		});
};
exports.getriderequest=function(message,callback)
{

var connection = connectDB();	

var query="select r.ride_id,c.customer_id,c.firstname,c.lastname,c.phone_number,r.source_location,r.source_street,r.source_area,r.source_zipcode,r.source_city,r.destination_location,r.destination_street,r.destination_city,r.destination_zipcode,r.distance from uber.customer c join uber.rides r on c.customer_id=r.customer_id where r.ride_status=0 and r.driver_id="+message.id;
console.log(query);
connection.query(query, function (err, rows, fields) 
		{
	if(err)
	{
		var response = {statusCode : 401, message : "Unknown"};
		callback(response);throw err;
	}
	else
		{
		console.log(rows);
		var response={statusCode : 200,message:rows[0]};
		callback(response);
		
		}
	
		});
	
};

exports.createBill=function(message,callback)
{
	var connection = connectDB();	
	console.log('reached bil DAO..');
	var x=message.message;
	console.log(x);
	
	var durationquery="select UNIX_TIMESTAMP('"+x.drop_time+"')-UNIX_TIMESTAMP('"+x.pickup_time+"') as output;";
	//console.log(query);
	console.log(durationquery);
	connection.query(durationquery, function (err, rows, fields) 
			{
			console.log('duration obtained is ');
			console.log(rows[0]);
			var duration=rows[0].output;
			
			//calculating bill amount here....
			
			var bill_amount=x.distance*10+duration*(1/60);
			console.log(bill_amount);
			console.log(x);
			var query="update uber.rides set billing_date='"+x.BILLING_DATE+"', pickup_time='"+x.pickup_time+"',drop_time ='"+x.drop_time+"', ride_status = 2, bill_amount="+bill_amount+" where ride_id="+x.ride_id;
			console.log(query);
			connection.query(query, function (err, rows, fields) 
				{
					
				if(err)
					{
					
					callback({code:401,message:'error'});
					}
				
			else
				{
				duration=duration/60;
				console.log('about to send back bill amount exACTLY');
				console.log(duration);
				console.log('Bill amount generated is '+bill_amount);
				console.log({bill_amount:bill_amount,duration:duration});
				callback({bill_amount:bill_amount,duration:duration});
				}
				});
			
		
});
};

exports.inprogress=function(message,callback)
{
	
	var connection = connectDB();	
	console.log('In update progress DAO....');
	console.log(message);
	var query="update uber.rides set ride_status =1 where ride_id="+message.ride_id;
	console.log(query);
	connection.query(query, function (err, rows, fields) 
			{
				
			if(err)
				{
				throw err;
				var response = {"statuscode" : 401, "message" : "Unknown"};
				callback(response);
				}
			else
				{
				console.log('done with updating progress to 1 ');
				var response = {"statuscode" : 200, "message" : "Unknown"};
				callback(response);
				}
			
	
});};

exports.reviewcustomer=function(message,callback){
	var connection = connectDB();
	console.log('Here in the DAO object for submission of review and rating');
	
	console.log(message);
	var connectionmongo=
		MongoClient.connect("mongodb://localhost:27017/uber", function(err, _db){ 	
	if(err){throw err;}
	console.log(_db);
	//return _db;
	//return _db;
		
		db=_db;
		coll=db.collection('driver');
		coll.update({"_id":message.driver_id},{$push:{reviews:{"customerid":message.message.customer_id,rating:message.message.rating,review:message.message.review}},"$set":{"driver_status":0}},function(err,res){
			  if(err)
				  throw err;
			  else
				  {
				  response={"StatusCode":200};
				  callback(response);
				  }
					
		});
		});
};
	
exports.getDriverProfile=function(ssn,callback){
	console.log('below is ssn');
	console.log(ssn);
	var select_driver_query="select * from driver where driver_id="+ssn;
	var select_driver_credentials_query="select * from driver_credentials where driver_id="+ssn;
	var data = {};
	console.log(select_driver_query+"\n"+select_driver_credentials_query);
	var connection=connectDB();
	connection.query(select_driver_query, function (err, rows, fields) {
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
				connection.query(select_driver_credentials_query, function (err, rows, fields) {
					if(err){
						callback(null);
					}
					else{
						if(rows.length>0){
							data.email=rows[0].EMAIL;
							callback(data);
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

exports.updateDriverDetails=function(ssn,firstName,lastName,address,city,state,zipcode_primary,zipcode_secondary,phone,email,callback){
	var update_driver_query="update driver set FIRSTNAME=?,LASTNAME=?,ADDRESS=?,CITY=?,STATE=?,ZIP_PRIMARY=?,ZIP_SECONDARY=?,PHONE_NUMBER=? where DRIVER_ID=?";
	var params=[firstName,lastName,address,city,state,zipcode_primary,zipcode_secondary,phone,ssn];
	var finalQuery=mysql.format(update_driver_query,params)+";";
	var update_driver_credentials_query="update driver_credentials set EMAIL=? where DRIVER_ID=?";
	params=[email,ssn];
	finalQuery+=mysql.format(update_driver_credentials_query,params)+";";
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
exports.getDriverLocation = function(location, callback){
	var combinedDriversArray = {};
	
		query = {location:{ $near:{  $geometry:{  type:"point", coordinates: location }, $maxDistance:16093.4}  } }
		options = {limit : 2, "sort" : [['_id', 'desc']]};
		console.log(query);
		mongoHandler.find('driver', query, options).toArray(function(err, mongoDrivers){
			var res;
			if(mongoDrivers.length > 0){
				
				var driversArray = [];
				for(res in mongoDrivers){
					mongoDrivers[res].location = mongoDrivers[res].location.reverse();
					driversArray.push(mongoDrivers[res]._id);
				}
				
				var query = "select driver_id,firstname, lastname, phone_number from driver where driver_id in ("+driversArray+")order by driver_id desc"
				console.log("query is "+query);
				mysql_pool.query(query, function (err, sqlDrivers, fields){
				
					console.log(err);
					console.log(sqlDrivers[0]);
					console.log(mongoDrivers);
					for(driver in mongoDrivers)
					{
						   combinedDriversArray[mongoDrivers[driver]._id] = {
								   										  driverId : mongoDrivers[driver]._id,
								   										  firstName : sqlDrivers[driver].firstname, 
								   							   			  lastName : sqlDrivers[driver].lastname,
								   							   			  phone : sqlDrivers[driver].phone_number,
								   							   			  carDetails : mongoDrivers[driver].car,
								   							   			  driverReviews : mongoDrivers[driver].reviews,
								   							   			  location : mongoDrivers[driver].location,
								   							   			  video : mongoDrivers[driver].video,
								   							   			  rating : mongoDrivers[driver].rating
								   							   			  }; 
						
						   
					}
		
					console.log("Array "+combinedDriversArray["109090910"].firstName);
	
					res = {statusCode : 200, message : { driverData : combinedDriversArray, locations : mongoDrivers}};
					callback(res);
				});
				
			}
			else
			{
				res = {statusCode : 404, message : "No cars available"};
				callback(res);
			}					 		
		
	})

  
};

