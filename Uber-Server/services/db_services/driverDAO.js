/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
var MongoClient = require('mongodb').MongoClient; 
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
function connectMongo(colname,qry,callback)
{
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
}

exports.validateDriver = function(email, password, callback)
{
 
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
	var query = "INSERT INTO driver VALUES("+message.data[0]+",'"+message.data[1]+"','"+message.data[2]+"','"+message.data[8]+"','"+message.data[9]+"','"+message.data[10]+"',"+message.data[5]+","+message.data[6]+","+message.data[7]+");";
	console.log(query);
	connection.query(query, function (err, rows, fields) 
		{
			if(err)
				{
					var response = {statusCode : 401, message : "exist"};
					callback(response);
				}
			if(!err)
				{
					var query2="INSERT INTO driver_credentials values('"+message.data[4]+"','"+message.data[3]+"',"+message.data[0]+","+0+");";
					console.log(query2);
					connection.query(query2,function(err,rows,fields){
					
					if(err)
						{
							var response = {statusCode : 401, message : "failure"};
							callback(response);
						}
					if(!err)
						{
							var response = {statusCode : 200, message : "success"};								
							qry={"_id":message.data[0],"driver_status":0,"reviews":[],"video":message.data[13],"location":[],"car":{"brand":message.data[11],"number":message.data[12]}};
							connectMongo("driver",qry,callback);											
						}						
					});
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