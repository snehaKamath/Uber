 var bcrypt = require('bcrypt');
 var SALT = 10;

 exports.encryption = function(password, callback){
   
   bcrypt.genSalt(SALT, function(err, salt) {
	   
       bcrypt.hash(password, salt, function(err, hash) {
    	   
         if(!err)
           callback(hash);
       });
   });
 };

 exports.decryption = function(inputPassword, dbPassword, callback){
	 
   bcrypt.compare(inputPassword,dbPassword, function(err, res) {
	   
     if(res == true)	{
         callback("success");
     }
     else	{
         callback("failed");
     }
   });   
 };