/**
 * http://usejsdoc.org/
 */
var mysql = require('mysql');
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
          callback(response);
        });
      }
      else{
        response = {statusCode : 401, message : "Invalid Email"};
        	callback(response);
      }
    
    });
};