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
/*
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
	     
};*/

exports.searchBill=function(id,type,callback){
  if(type=="searchBill_billid"){
      query=mysql_pool.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where ride_id=? and ride_status=2 ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
      console.log(query.sql);
      if(!err){
      if(rows.length<=0){
        callback({statuscode:401,message:"Bill does not exist"});
      }else if(rows.length==1){
        callback({statusCode:200,message:rows});
      }
     }else{
       callback({statusCode:401,message:"Database error"});
     }
    
  })
  }else if(type=="searchBill_customerId"){
    query=mysql_pool.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where rides.customer_id=? and ride_status=2  ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
      if(!err){
      if(rows.length<=0){
        callback({statuscode:401,message:"There exists no bill for this customer"});
      }else if(rows.length>0){
        callback({statusCode:200,message:rows});
      }
     }else{
       callback({statusCode:401,message:"Database error"});
     }
    
  })
  }else if(type=="searchBill_driverId"){
    query=mysql_pool.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where rides.driver_id=? and ride_status=2  ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
      if(!err){
      if(rows.length<=0){
        callback({statuscode:401,message:"There exists no bill for this driver"});
      }else if(rows.length>0){
        callback({statusCode:200,message:rows});
      }
     }else{
       callback({statusCode:401,message:"Database error"});
     }
    
  })
  }
}

exports.incompletereview=function(driver_id,callback){

	console.log('Here is the driver id for ')
query=mysql_pool.query("select * from uber.rides where review_status < 3 and ride_status=2 and driver_id ="+driver_id,function(err,rows,fields){
if(err)
	throw err;
	else
		{
		console.log('Looking for incomplete reviews in database');
		console.log(rows);
		callback(rows);
		}
});
};
exports.updatedriverreview=function(ride_id,callback){
	console.log('In update driver review stage at rides DAO ');
console.log(ride_id);
var query="update uber.rides set review_status=review_status+3 where ride_id=?";
query=mysql_pool.query(query,ride_id,function(err,rows,fields){
	if(err)
		throw err;
	
});
	
};