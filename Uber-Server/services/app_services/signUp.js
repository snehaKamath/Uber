/**
 * http://usejsdoc.org/
 */
var driver_DAO=require('../db_services/driver_DAO')
exports.handle_request = function(message, callback)	{
	if(message.reqType === "createDriver")		{ 
		console.log('This is reached at driver handle request');
		driver_DAO.createDriver(message,callback);
	}
};

