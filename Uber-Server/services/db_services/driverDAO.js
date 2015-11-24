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

// this mongo db connection takes collection name, qry  and callback to be executed........
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
  
      if(rows.length >0){
        bcrypt.decryption(password, rows[0].PASSWORD, function(response){
          if(response == "success"){
            response = {statusCode : 200, message : rows[0]};
            
          }
          else{
            response = {statusCode : 401, message : "Passwords do not match"};
            
          }
        });
      }
      else{
        response = {statusCode : 401, message : "Invalid Email"};
      }
	callback(response);    
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