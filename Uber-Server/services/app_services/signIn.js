/**
 * http://usejsdoc.org/
 */

var mysql=require('mysql');
 var connection = mysql.createConnection({
      host : 'localhost',
      user : 'root',
      password : '',
      database : 'uber'
   });
connection.connect();
   
exports.handle_request=function(message,callback){

  if(message.reqType=="adminSignIn"){
  adminSignIn(message,callback);
  }
}


function adminSignIn(message,callback){
  
  adminEmailid=message.adminEmailid;
  adminPassword=message.adminPassword;
  
  res={};
  query = connection.query('SELECT * from admin where USERNAME= ?', [ adminEmailid], function(err, rows, fields) {
         
         if (!err) {
            if (rows.length==1) {
              result=rows[0];
              if(result["PASSWORD"]==adminPassword){
                 adminId=result["ADMIN_ID"];
                 res.status="login successful";
                 res.adminId=adminId;
                 }
              else{
                res.status="invalid password";
                }
          }
            else {
              res.status="invalid username";
              }
         }
         else {
           res.status=err;
           }
         callback(res);
  });
  console.log(query.sql);
}

