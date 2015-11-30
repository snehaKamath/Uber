
var mysql = require('mysql');
var mongo = require("./mongo");
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

exports.createDriver = function( driverid, firstname, lastname, password, email,
												phonenumber, zip_primary, zip_secondary, address, city, 
												state, carbrand, carnumber, video, 
												callback)	{
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

exports.getDriverLocation = function(location, callback){
	var combinedDriversArray = {};
	
		var driver= mongoDB.collection('driver');
		query = {location:{ $near:{  $geometry:{  type:"point", coordinates: location }, $maxDistance:16093.4}  } }
		options = {limit : 2, "sort" : [['_id', 'desc']]};
		console.log(query);
		driver.find(query, options).toArray(function(err, mongoDrivers){
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

