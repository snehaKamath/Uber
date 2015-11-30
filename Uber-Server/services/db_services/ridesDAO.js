var mysql = require('mysql');


exports.createRide = function(rideData,locations, callback){

	
	sourcePoint = "POINT("+locations.source_location.lat+" "+locations.source_location.lng+")";
	destPoint = "POINT("+locations.destination_location.lat+" "+locations.destination_location.lng+")"; 
	  
	  var query = "insert into rides SET ?, source_location = GeomFromText(?), destination_location = GeomFromText(?)";
	  console.log(query);
	   mysql_pool.query(query, [rideData, sourcePoint, destPoint], function (err, rows, fields) {
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
	  
	  var query = "select * from mytable order by id desc limit "+count+",10";
	  
	   mysql_pool.query(query, function (err, rows, fields) {
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