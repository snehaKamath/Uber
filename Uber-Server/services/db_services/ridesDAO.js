/**
 * http://usejsdoc.org/
 */
mysql = require('mysql');
bcrypt = require('../app_services/bcrypt');

function connectDB() {
  var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'uber',
    multipleStatements : true
  });

  connection.connect(function(err) {
    if (err) {
      throw err;
    }
  });
  return connection;
}

connection = connectDB();

exports.searchBill=function(id,type,callback){
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
    query=connection.query("select *, customer.FIRSTNAME AS CFNAME, customer.LASTNAME AS CLNAME, driver.FIRSTNAME as dfname, driver.LASTNAME AS dlname from rides inner join customer on rides.CUSTOMER_ID=customer.CUSTOMER_ID inner join driver on rides.DRIVER_ID=driver.DRIVER_ID where rides.customer_id=? ORDER BY DROP_TIME DESC",[id],function(err,rows,fields){
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
};

exports.incompletereview=function(message,callback){
console.log(message);
query=connection.query("select * from uber.rides where review_status < 3 and ride_status=2 and driver_id ="+message.id,function(err,rows,fields){
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
exports.updatedriverreview=function(message,callback){
console.log(message);	
query=connection.query("update uber.rides set review_status=review_status+3 where ride_id="+message.ride_id.ride_id,function(err,rows,fields){
	if(err)
		throw err;
	
});
	
};