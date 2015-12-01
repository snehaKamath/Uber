/**
 * http://usejsdoc.org/
 */
adminDAO = require('../db_services/adminDAO');


exports.handle_request = function(message, callback)	{
  console.log("In handle_request"+ message.reqType);
	if(message.reqType === "viewDriverApprovals"){
	  viewDriverApprovals(message,callback);
  }
	if(message.reqType=="getDriverCarDetails"){
	  getDriverCarDetails(message,callback);
	}
	if(message.reqType=="approveDriverRequest"){
	  approveDriverRequest(message,callback);
	}
	if(message.reqType === "viewCustomerApprovals"){
    viewCustomerApprovals(message,callback);
  }
	if(message.reqType=="approveCustomerRequest"){
    approveCustomerRequest(message,callback);
  }
	if(message.reqType=="getAdminProfile"){
	  getAdminProfile(message,callback);
	}
	 if(message.reqType=="deleteDriver"){
	    deleteDriver(message,callback);
	  }
	 if(message.reqType=="deleteBill"){
     deleteBill(message,callback);
   }
	 if(message.reqType=="deleteCustomer"){
	   deleteCustomer(message,callback);
	 }
	 if(message.reqType=="getRevenueGraph"){
	   getRevenueGraph(message,callback);
	 }
	 if(message.reqType=="getCustomerGraph"){
     getCustomerGraph(message,callback);
   }
	 if(message.reqType=="getDriverGraph"){
     getDriverGraph(message,callback);
   }
	 if(message.reqType=="getZipcodeGraph"){
     getZipcodeGraph(message,callback);
   }
	 if(message.reqType=="getCityGraph"){
     getCityGraph(message,callback);
   }
   if(message.reqType=="getDrivers"){
     getDrivers(message,callback);
   }
   if(message.reqType=="getCustomers"){
     getCustomers(message,callback);
   }
};

function viewDriverApprovals(message,callback){
    adminDAO.viewDriverApprovals(function(response){
    callback(response);
  })
}

function getDriverCarDetails(message,callback){
   var driverId=message.driverId;
   adminDAO.getCarDetails(driverId,function(response){
    callback(response);
  });
}

function approveDriverRequest(message,callback){
   var driverId=message.driverId;
   adminDAO.approveDriverRequest(driverId,function(response){
    callback(response);
   })
}

function viewCustomerApprovals(message,callback){
    adminDAO.viewCustomerApprovals(function(response){
    callback(response);
  })
}

function approveCustomerRequest(message,callback){
  var customerId=message.customerId;
  adminDAO.approveCustomerRequest(customerId,function(response){
    callback(response);
   })
}

function getAdminProfile(message,callback){
  var adminId=message.adminId;
  adminDAO.getAdminProfile(adminId,function(response){
    callback(response);
  })
}

function deleteDriver(message,callback){
  var driverId=message.driverId;
  adminDAO.deleteDriver(driverId,function(response){
    callback(response);
  })
}

function deleteCustomer(message,callback){
  var customerId=message.customerId;
  adminDAO.deleteCustomerr(customerId,function(response){
    callback(response);
  })
}

function deleteBill(message,callback){
  var billid=message.billid;
  adminDAO.deleteBill(billid,function(response){
    callback(response);
  })
}

function getRevenueGraph(message,callback){
  adminDAO.getRevenueGraphs(function(response){
   callback(response);
  })
}

function getCustomerGraph(message,callback){
  customerId=message.customerId;
 adminDAO.getCustomerGraph(customerId,function(response){
    callback(response);
   })
}

function getDriverGraph(message,callback){
  driverId=message.driverId;
  adminDAO.getDriverGraph(driverId,function(response){
    callback(response);
   })
}

function getZipcodeGraph(message,callback){
  zipcode=message.zipcode;
 adminDAO.getZipcodeGraph(zipcode,function(response){
    callback(response);
   })
}

function getCityGraph(message,callback){
  city=message.city;
 adminDAO.getCityGraph(city,function(response){
    callback(response);
   })
}

function getDrivers(message,callback){
  count=message.count;
  adminDAO.getDrivers(count,function(response){
    callback(response);
  })
}

function getCustomers(message,callback){
  count=message.count;
  adminDAO.getCustomers(count,function(response){
    callback(response);
  })
}