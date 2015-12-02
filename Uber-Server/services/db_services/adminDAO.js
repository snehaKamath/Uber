mysql = require('mysql');
var mongoHandler = require('./mongoHandler');
bcrypt = require('../app_services/bcrypt');




exports.validateAdmin = function(email, password, callback) {
   var query = "select * from admin where  USERNAME = ?";
  var query_1 = mysql_pool.query(query,[email], function(err, rows, fields) {
   if (rows.length > 0) {
      bcrypt.decryption(password, rows[0].PASSWORD, function(response) {
        if (response == "success") {
        	  response = {statusCode : 200,message : rows[0]};
        } else {
         response = {statusCode : 401,message : "Invalid Password"};
        }
        console.log(response.statusCode);
        callback(response);
      });
   } else {
      response = {statusCode : 401, message : "Invalid Email"};
      callback(response);
  }

  });
  console.log(query_1.sql);
  console.log("query:"+query_1);
}

exports.viewDriverApprovals=function(callback){
   var query="select * from driver_credentials inner join driver on driver_credentials.DRIVER_ID=driver.DRIVER_ID and driver_credentials.STATUS=0";
  mysql_pool.query(query,function(err,rows,fields){
    if(rows.length>0){
      response={statusCode:200,message:rows};
    } else if(rows.length==0){
      response={statusCode:201,message:"No pending driver approval requests"};
    } else if(err){
      response={statusCode:401,message:"Database error"};
    }
    callback(response);
  });
};

exports.viewCustomerApprovals=function(callback){
  var query="select * from customer_credentials inner join customer on customer_credentials.CUSTOMER_ID=customer.CUSTOMER_ID and customer_credentials.STATUS=0";
  mysql_pool.query(query,function(err,rows,fields){
    if(rows.length>0){
      response={statusCode:200,message:rows};
    } else if(rows.length==0){
      response={statusCode:201,message:"No pending customer approval requests"};
    } else if(err){
      response={statusCode:401,message:"Database error"};
    }
    callback(response);
  });
};


exports.getCarDetails=function(driverId,callback){
  query={"_id":driverId},{video:0};
  
  mongoHandler.findOne('driver', query,function(err, mongoDriver){
     if(!err){
        callback({statusCode:200,message:mongoDriver});
        console.log(mongoDriver.car.brand);
     }else{
        callback({statusCode:401,message:"database error"});
     }
  })
 // driver=db.collection('driver');
 /* driver.findOne({"_id":driverId},{video:0},function(err,driver){
      if(!err){
        //var GridStore=require('mongodb').GridStore;
       // var gridStore = new GridStore(db,"5658ecd43ecc637f3ad0cd59");
        //gridStore.stream.pipe()
      callback({statusCode:200,message:driver});
      console.log(driver.car.brand);
      }else{
        callback({statusCode:401,message:"database error"});
      }
  }) ;*/
};

exports.approveDriverRequest=function(driverId,callback){
  var query="UPDATE driver_credentials SET  status=1 WHERE  DRIVER_ID=?";
  mysql_pool.query(query,[driverId],function(err){
    if(!err){
      callback({statusCode:200,message:"request approved"});
    }else{
      callback({statusCode:401,message:"database error"});
    }
  });
}

exports.approveCustomerRequest=function(customerId,callback){
   var query="UPDATE customer_credentials SET  status=1 WHERE  CUSTOMER_ID=?";
  mysql_pool.query(query,[customerId],function(err){
    if(!err){
      callback({statusCode:200,message:"request approved"});
    }else{
      callback({statusCode:401,message:"database error"});
    }
  });
}

exports.getAdminProfile=function(adminId,callback){
  var query="SELECT * from admin where ADMIN_ID=?";
  mysql_pool.query(query,[adminId],function(err,rows,fields){
    if(!err){
      if(rows.length==0){
        callback({statusCode:201,message:"no profile found!"});
      }
      else{
        callback({statusCode:200,message:rows[0]});
      }
   }else{
     callback({statusCode:401,message:"database error"});
   }
 })
}

exports.deleteDriver=function(driverId,callback){
  var query=mysql_pool.query("SELECT *  FROM driver_credentials where DRIVER_ID=?",[driverId],function(err,rows,fields){
      if(rows.length<=0){
        callback({statusCode:401,message:"Driver does not exist"});
      }
      else if(rows[0].STATUS==2){
        callback({statusCode:201,message:"Driver already deleted"});
      } else if(rows[0].STATUS==0 || rows[0].STATUS==1){
        query="UPDATE driver_credentials SET status=2 WHERE DRIVER_ID=?";
        mysql_pool.query(query,[driverId],function(err,rows,fields){
          if(!err){
             callback({statusCode:200,message:"Driver deleted"});
          }else{
           callback({statusCode:401,message:"database error"});
         }
        })
      }
  })
};

exports.deleteCustomerr=function(customerId,callback){
   var query=mysql_pool.query("SELECT *  FROM customer_credentials where CUSTOMER_ID=?",[customerId],function(err,rows,fields){
    if(rows.length<=0){
      callback({statuscode:401,message:"Customer does not exist"});
    }
    else if(rows[0].STATUS==2){
      callback({statusCode:201,message:"Driver already deleted"});
    } else if(rows[0].STATUS==0 || rows[0].STATUS==1){
      query="UPDATE customer_credentials SET status=2 WHERE CUSTOMER_ID=?";
     mysql_pool.query(query,[customerId],function(err,rows,fields){
        if(!err){
           callback({statusCode:200,message:"Customer deleted"});
        }else{
         callback({statusCode:401,message:"database error"});
       }
      })
    }
  })
}

exports.getRevenueGraphs=function(callback){
    var query=mysql_pool.query("select sum(bill_amount) as revenue,billing_date from rides where ride_status=2 group by billing_date order by billing_date limit 0,7",function(err,rows,fields){
    if(!err){
      callback({statusCode:200,message:rows});
    }
    else{
      callback({statusCode:401,message:"error fetching graph details"});
    }
  })
}

exports.getCustomerGraph=function(customerId,callback){
  query=mysql_pool.query("select count(ride_id) as rides,billing_date from rides where customer_id=? and ride_status=2 group by billing_date order by billing_date limit 0,7",[customerId],function(err,rows,fields){
    if(!err){
      if(rows.length<=0){
        callback({statusCode:401,message:"customer does not exist"});
        }else if(rows.length>0){
          callback({statusCode:200,message:rows})
        }
    
    }else{
      callback({statusCode:401,message:"Database error"});
    }
  })
}

exports.deleteBill=function(billid,callback){

  query=mysql_pool.query("SELECT *  FROM rides where RIDE_ID=?",[billid],function(err,rows,fields){
    if(rows.length<=0){
      callback({statusCode:401,message:"Bill does not exist"});
    }
    else if(rows[0].STATUS==3){
      callback({statusCode:201,message:"Bill already deleted"});
    } else{
      query="UPDATE rides SET ride_status=3 WHERE RIDE_ID=?";
      mysql_pool.query(query,[billid],function(err,rows,fields){
        if(!err){
           callback({statusCode:200,message:"Bill deleted"});
        }else{
         callback({statusCode:401,message:"database error"});
       }
      })
    }
  })
};

exports.getDriverGraph=function(driverId,callback){

  query=mysql_pool.query("select count(ride_id) as rides,billing_date from rides where driver_id=? and ride_status=2 group by billing_date order by billing_date limit 0,7",[driverId],function(err,rows,fields){
    if(!err){
      if(rows.length<=0){
        callback({statusCode:401,message:"driver does not exist"});
        }else if(rows.length>0){
          callback({statusCode:200,message:rows})
        }
    
    }else{
      callback({statusCode:401,message:"Database error"});
    }
  })
}

exports.getZipcodeGraph=function(zipcode,callback){

  query=mysql_pool.query("select count(ride_id) as rides,billing_date from rides where source_zipcode=? and ride_status=2 group by billing_date order by billing_date limit 0,7",[zipcode],function(err,rows,fields){
    if(!err){
      if(rows.length<=0){
        callback({statusCode:401,message:"zipcode does not exist"});
        }else if(rows.length>0){
          callback({statusCode:200,message:rows})
        }
    
    }else{
      callback({statusCode:401,message:"Database  error"});
    }
  })
}

exports.getCityGraph=function(city,callback){

  query=mysql_pool.query("select count(ride_id) as rides,billing_date from rides where source_city=? and ride_status=2 group by billing_date order by billing_date limit 0,7",[city],function(err,rows,fields){
    if(!err){
      if(rows.length<=0){
        callback({statusCode:401,message:"city does not exist"});
        }else if(rows.length>0){
          callback({statusCode:200,message:rows})
        }
    
    }else{
      callback({statusCode:401,message:"Unexpected error"});
    }
  })
}

exports.getDrivers=function(count,callback){
  
  var query="select * from driver_credentials inner join driver on driver_credentials.DRIVER_ID=driver.DRIVER_ID and driver_credentials.STATUS=1 order by driver_credentials.DRIVER_ID desc limit "+count+",2";
  mysql_pool.query(query,function(err,rows,fields){
    if(rows.length>0){
      response={statusCode:200,message:rows};
    } else if(rows.length==0){
      response={statusCode:201,message:"No drivers"};
    } else if(err){
      response={statusCode:401,message:"Database error"};
    }
    callback(response);
  });
  
}


exports.getCustomers=function(count,callback){
  
  var query="select * from customer_credentials inner join customer on customer_credentials.CUSTOMER_ID=customer.CUSTOMER_ID and customer_credentials.STATUS=1 order by customer_credentials.CUSTOMER_ID desc limit "+count+",10" ;
 mysql_pool.query(query,function(err,rows,fields){
    if(rows.length>0){
      response={statusCode:200,message:rows};
    } else if(rows.length==0){
      response={statusCode:201,message:"No customers"};
    } else if(err){
      response={statusCode:401,message:"Database error"};
    }
    callback(response);
  });
  
}