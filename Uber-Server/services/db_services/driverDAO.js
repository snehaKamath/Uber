/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var mongo = require("./mongo");
var MongoClient = require('mongodb').MongoClient; 
var mongoURL = "mongodb://localhost:27017/uber"
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

// this connection takes collection name, qry  and callback to be executed........
function connectMongo(colname,qry,callback){
	var connectionmongo=
		MongoClient.connect("mongodb://localhost:27017/uber", function(err, _db){ 	
	if(err){throw err;}
	console.log(_db);
	//return _db;
	//return _db;
		
		db=_db;
		coll=db.collection(colname);
		coll.insert(qry,function(err,res){
			if(err)	{
				response = {statusCode : 401, message : "Passwords do not match"};
				callback(response);
			}
			else
				{
				response = {statusCode : 200, message : "success"};
				callback(response);
				}
			});
		
		});
//return connectionmongo;	
};

exports.validateDriver = function(email, password, callback){
 
  var connection = connectDB();
  var query = "select * from driver_credentials where  email = "+connection.escape(email);
  
    connection.query(query, function (err, rows, fields) {
      
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
	var connection = connectDB();
	var query = "INSERT INTO driver(driver_id, firstname,lastname,address,city,state,phone_number,zip_primary, zip_secondary) VALUES("+message.data[0]+",'"+message.data[1]+"','"+message.data[2]+"','"+message.data[8]+"','"+message.data[9]+"','"+message.data[10]+"',"+message.data[5]+","+message.data[6]+","+message.data[7]+");";
	console.log(query);
	connection.query(query, function (err, rows, fields) 
		{
			if(err)
				{
					response = {statusCode : 401, message : "exist"};
					callback(response);
				}
			if(!err)
				{
					var query2="INSERT INTO driver_credentials values('"+message.data[4]+"','"+message.data[3]+"',"+message.data[0]+","+0+");";
					console.log(query2);
					connection.query(query2,function(err,rows,fields){
					
					if(err)
						{
							response = {statusCode : 401, message : "failure"};
							callback(response);
						}
					if(!err)
						{
							response = {statusCode : 200, message : "success"};								
							qry={"_id":message.data[0],"reviews":[],"video":message.data[13],location:[],"car":{"brand":message.data[11],"number":message.data[12]}};
							connectMongo("driver",qry,callback);											
						}						
					});
				}	
		});
};

exports.getDriverLocation = function(location, callback){
	var combinedDriversArray = {};
	mongo.connect(mongoURL, function(db){
		var driver= mongo.collection(db,'driver');
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
				var connection = connectDB();
				var query = "select driver_id,firstname, lastname, phone_number from driver where driver_id in ("+driversArray+")order by driver_id desc"
				console.log("query is "+query);
				connection.query(query, function (err, sqlDrivers, fields){
				
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
			
			
		}); 
		
		
	})

  
};

