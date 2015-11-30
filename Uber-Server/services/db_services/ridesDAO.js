var mysql = require('mysql');

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

exports.createRide = function(rideData,locations, callback){

	
	sourcePoint = "POINT("+locations.source_location.lat+" "+locations.source_location.lng+")";
	destPoint = "POINT("+locations.destination_location.lat+" "+locations.destination_location.lng+")"; 
	  var connection = connectDB();
	  var query = "insert into rides SET ?, source_location = GeomFromText(?), destination_location = GeomFromText(?)";
	  console.log(query);
	   connection.query(query, [rideData, sourcePoint, destPoint], function (err, rows, fields) {
	      console.log(err);
	      if(rows.length >0){
	    	  res = {statusCode : 200, message : "Request Sent"};
	      }
	      else
	    	  res = {statusCode : 401, message : "Not Created"};
	      
	      callback(res);
	                   	          
	        });
	     
};

exports.getCustomerRides = function(count, callback){
	 count = Number(count)
	  var connection = connectDB();
	  var query = "select * from mytable order by id desc limit "+count+",10";
	  
	   connection.query(query, function (err, rows, fields) {
		   console.log(rows.length);
	      console.log(err);
	      if(rows.length >0){
	    	  res = {statusCode : 200, message : rows};
	      }
	      else
	    	  res = {statusCode : 401, message : "No rows"};
	      
	      callback(res);
	                   	          
	       });
	     
};