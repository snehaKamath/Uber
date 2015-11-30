/**
 * http://usejsdoc.org/
 */
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
					var response = {statusCode : 401, message : "exist"};
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
	console.log(query);
};