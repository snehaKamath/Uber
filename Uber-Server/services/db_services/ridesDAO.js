var mysql = require('mysql');


exports.createRide = function(rideData,locations, callback){

	sourcePoint = "POINT("+locations.source_location.lat+" "+locations.source_location.lng+")";
	destPoint = "POINT("+locations.destination_location.lat+" "+locations.destination_location.lng+")"; 
	  
	  var query = "insert into rides SET ?, source_location = GeomFromText(?), destination_location = GeomFromText(?)";
	  console.log(query);
	   mysql_pool.query(query, [rideData, sourcePoint, destPoint], function (err, rows, fields) {
	      console.log(err);
	      console.log(rows.insertId);
	      if(rows){
	    	  res = {statusCode : 200, message : rows.insertId};
	      }
	      else
	    	  res = {statusCode : 200, message : rows.insertId};
	      
	      callback(res);
	                   	          
	        });
	     
};

exports.updateCustomerRide= function(rideData,ssn,locations, rideId, callback){
	console.log("Finnaly received at destination");
	destPoint = "POINT("+locations.destination_location.lat+" "+locations.destination_location.lng+")"; 
	var select_query="select RIDE_STATUS from rides where customer_id=? and ride_id =?";
	var params=[ssn,rideId];
	console.log(mysql.format(select_query,params));
	mysql_pool.query(select_query, params, function(err, rows, fields){
		console.log(rows);
		console.log(rows.length);
		console.log("Ride status"+rows[0].RIDE_STATUS);
		if(rows){
			console.log("results is"+rows.length)
			if(rows[0].RIDE_STATUS == 2 ){
				
				callback({status : 401, message : "Ride Finished"});
			}
			else{
				var update_query="update rides SET ?, destination_location = GeomFromText(?) where customer_id=? and ride_id = ?";
				var params=[rideData, destPoint,ssn, rideId];
				console.log(mysql.format(update_query,params));
			   mysql_pool.query(update_query, params, function(err, result){
				  console.log("result.changedRows"+result.changedRows);
				   if(result.changedRows == 1)
					   res = {status : 200, message : "Ride updated"};
				   else
					   res = {status : 401, message : "Ride not updated"};
				   callback(res);
			   });
			}
		}
		else
			callback({statusCode : 401, message : "Unexpected Error Occured"});
		
	});
};
/*exports.getCustomerRides = function(count, callback){
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
	     
}; */

exports.searchBill = function(id,type, count, callback){
	  if(type=="searchBill_billid"){
	      query=connection.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where ride_id=? ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
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
		  console.log("I am in my zone");
	    query=mysql_pool.query("select *, DATE_FORMAT(REQUESTED_TIME, '%d %b %y') as pickup_date, TIME(pickup_time) as pickup_time, TIME(drop_time) as drop_time, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where rides.customer_id=? and rides.RIDE_STATUS = 2 ORDER BY DROP_TIME DESC LIMIT "+count+",10",[id],function(err,rows,fields){
	    	console.log(err);
	      if(!err){
	      if(rows.length<=0){
	        callback({statuscode:401,message:"There exists no bill for this customer"});
	      }else if(rows.length>0){
	    	  
	    	  for( r in rows){
	    		  
	    		  if(rows[r].SOURCE_ZIPCODE != null)
	    	    	  rows[r].SOURCE_ZIPCODE = Number(rows[r].SOURCE_ZIPCODE);
	    	    	  else
	    	    		  rows[r].SOURCE_ZIPCODE = "";
	    	    	  
	    	    	  if(rows[r].DESTINATION_ZIPCODE != null)
	    		    	  rows[r].DESTINATION_ZIPCODE = Number(rows[r].DESTINATION_ZIPCODE);
	    		    	  else
	    		    		  rows[r].DESTINATION_ZIPCODE = "";
	    	    	  
	    	    	  source_address = rows[r].SOURCE_STREET+","+rows[r].SOURCE_AREA+","+rows[r].SOURCE_CITY+","+rows[r].SOURCE_STATE+" "+rows[r].SOURCE_ZIPCODE;
	    	    	  source_address = source_address.replace(",,",",");
	    	    	  
	    	    	  destination_address = rows[r].DESTINATION_STREET+","+rows[r].DESTINATION_AREA+","+rows[r].DESTINATION_CITY+","+rows[r].DESTINATION_STATE+" "+rows[r].DESTINATION_ZIPCODE;
	    	    	  destination_address = destination_address.replace(",,",",");
	    	    	  
	    	    	  if(source_address.charAt(0) == ",")
	    	    		  rows[r].source_address =   source_address.slice(1,source_address.length).trim();
	    	    	  
	    	    	  if(destination_address.charAt(0) == ",")
	    	    		  rows[r].destination_address =   destination_address.slice(1,destination_address.length).trim();
	    		  
	    		  
	    	  }
	    	  
	    	//console.log(JSON.stringify(rows[0].SOURCE_LOCATION));
	        callback({statusCode:200,message:rows});
	      }
	     }else{
	       callback({statusCode:401,message:"Database error"});
	     }
	    
	  })
	  }else if(type=="searchBill_driverId"){
	    query=connection.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where rides.driver_id=? ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
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

exports.getPendingReview = function(customerId, callback){
	
	
	var query = "select r.*,d.FIRSTNAME as dfname, d.LASTNAME as dlname from rides r, driver d where d.driver_id = r.driver_id and customer_id = ? and review_status not in (2,5) and ride_status = 2";

	mysql_pool.query(query, [customerId], function (err, rows, fields) {
	     
	      if(rows.length >0){
	    	  
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
	    		  source_address =   source_address.slice(1,source_address.length);
	    	  
	    	  if(destination_address.charAt(0) == ",")
	    		  destination_address =   destination_address.slice(1,destination_address.length);
	    	  
	    	  console.log(source_address);
	    	  console.log(destination_address);
	    	  driverName = rows[0].dfname+" "+rows[0].dlname;
	    	  
	    	  data = {"source_address" : source_address,
	    			  "destination_address" : destination_address,
	    			  "driverName" : driverName,
	    			  "bill_amount" : rows[0].BILL_AMOUNT,
	    			  "driver_id" : rows[0].DRIVER_ID,
	    			  "ride_id" : rows[0].RIDE_ID};
	    	  
	    	  res = {statusCode : 200, message : data};
	      }
	      else
	    	  res = {statusCode : 401, message : "No pending Reviews"};
	      
	      callback(res);
	                   	          
});

	     
};

exports.deleteCustomerRide=function(rideId,callback){
	var res={};
	var select_ride_query="select * from rides where ride_id=?";
	var params=[rideId];
	console.log(mysql.format(select_ride_query,params));
	mysql_pool.query(select_ride_query,params,function(err,results){
		if(!err){
			var status=results[0].RIDE_STATUS;
			if(status==0){
				var delete_query="delete from rides where ride_id=?";
				console.log(mysql.format(delete_query,params));
				mysql_pool.query(select_ride_query,params,function(err,results){
					if(!err){
						res = {statusCode : 200, message : "success"};
						callback(res);
					}
				});
			}
			else{
				res = {statusCode : 401, message : "Ride is accepted. Can't delete it now"};
				callback(res);
			}
		}
	});
};

