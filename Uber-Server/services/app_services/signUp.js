/**
 * http://usejsdoc.org/
 */
var driverDAO=require('../db_services/driverDAO')
exports.handle_request = function(message, callback)	{
	if(message.reqType === "createDriver")		{ 
		console.log('This is reached at driver handle request');
		driverDAO.createDriver(message,callback);
	}
};

