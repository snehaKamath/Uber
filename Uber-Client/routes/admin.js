var mq_client = require('../rpc/client');
//var GridStore=require('mongodb').GridStore;
module.exports = function (app)	{
	//Define routes here, refer to signIn.js file for example};
  app.get('/viewDriverApprovals',viewDriverApprovals);
  app.post('/getDriverCarDetails',getDriverCarDetails);
  app.post('/approveDriverRequest',approveDriverRequest);
  
  app.get('/viewCustomerApprovals',viewCustomerApprovals);
  app.post('/approveCustomerRequest',approveCustomerRequest);
  
  app.get("/getAdminProfile",getAdminProfile);
  app.post('/deleteDriver',deleteDriver);
  app.post('/deleteCustomer',deleteCustomer);
  app.post('/deleteBill',deleteBill);
  
  app.get('/getRevenueGraph',getRevenueGraph);
  app.post('/getCustomerGraph',getCustomerGraph);
  app.post('/getDriverGraph',getDriverGraph);
  app.post('/getZipCodeGraph',getZipCodeGraph);
  app.post('/getCityGraph',getCityGraph);
  
  app.get('/getDrivers/:count',getDrivers);
  app.get('/getCustomers/:count',getCustomers);
  
};

function viewDriverApprovals(req,res){
     var viewDriverApprovals_msg={reqType:"viewDriverApprovals"};
     mq_client.make_request('admin_service_req_q',viewDriverApprovals_msg,function(results){
     res.send(results);
     });
}

function getDriverCarDetails(req,res){
  var driverId=req.body.driverId;
  if(driverId===undefined || driverId===null){
    json_response={statusCode:401,message:"driverId is undefined"};
    res.send(json_response);
  }
  console.log("driver id is:"+driverId);
  var getDriverCarDetails_msg={driverId:driverId,reqType:"getDriverCarDetails"};
  mq_client.make_request('admin_service_req_q',getDriverCarDetails_msg,function(results){
  /*  if(results.statusCode==undefined || results.statusCode==null){
      json_response={statusCode:401,message:"unexpected error"};
      res.send(json_response);
    }*/
  /*  var fs = require('fs'); 
    var readableStream = fs.createReadStream('/Users/snehakamath/Documents/workspace_lab2/uber_project/Uber/Uber-Client/public/images/video2.mp4'); 
  
     readableStream.setEncoding('utf8'); 
     res.writeHead(200, {'Content-Type': 'video/mp4'});
     readableStream.on('data', function(chunk) {

     res.write(chunk); 
     }); 
     readableStream.on('end', function() { 
       res.end()
       
     });*/
   res.send(results);
  });
}

function approveDriverRequest(req,res){
  var driverId=req.body.driverId;
  if(driverId===undefined || driverId===null){
    json_response={statusCode:401,message:"Driver Id is undefined"};
    res.send(json_response);
  }
  var approveDriverRequest_msg={driverId:driverId,reqType:"approveDriverRequest"};
  mq_client.make_request('admin_service_req_q',approveDriverRequest_msg,function(results){
    res.send(results);
  });
}

function viewCustomerApprovals(req,res){
  var viewCustomerApprovals_msg={reqType:"viewCustomerApprovals"};
  mq_client.make_request('admin_service_req_q',viewCustomerApprovals_msg,function(results){
  res.send(results);
  });
}

function approveCustomerRequest(req,res){
  customerId=req.body.customerId;
  if(customerId===undefined || customerId===null){
    json_response={statusCode:401,message:"Customer id is undefined"};
    res.send(json_response);
  }
  var approveCustomerRequest_msg={customerId:customerId,reqType:"approveCustomerRequest"};
  mq_client.make_request('admin_service_req_q',approveCustomerRequest_msg,function(results){
  res.send(results);
  });
}

function getAdminProfile(req,res){
  if(req.session.adminId===undefined || req.session.adminId===null){
    json_response={statusCode:401,message:"Admin is undefined"};
    res.send(json_response);
  }
  var getAdminProfile_msg={adminId:req.session.adminId,reqType:"getAdminProfile"};
  mq_client.make_request('admin_service_req_q',getAdminProfile_msg,function(results){
    res.send(results);
  });
}

function deleteDriver(req,res){
  var driverId=req.body.driverId;
  if(driverId===undefined || driverId===null){
    json_response={statusCode:401,message:"Driver Id is undefined"};
    res.send(json_response);
  }
  var deleteDriver_msg={driverId:req.body.driverId,reqType:"deleteDriver"};
  mq_client.make_request('admin_service_req_q',deleteDriver_msg,function(results){
    res.send(results);
  });
  
}

function deleteCustomer(req,res){
  customerId=req.body.customerId;
  if(customerId===undefined || customerId===null){
    json_response={statusCode:401,message:"Customer id is undefined"};
    res.send(json_response);
  }
  
  var deleteCustomer_msg={customerId:req.body.customerId,reqType:"deleteCustomer"};
  mq_client.make_request('admin_service_req_q',deleteCustomer_msg,function(results){
    res.send(results);
  });
  
}

function deleteBill(req,res){
  var billid=req.body.billid;
  if(billid===undefined || billid===null){
    json_response={statusCode:401,message:"Bill Id is undefined"};
    res.send(json_response);
  }
  var deleteBill_msg={billid:req.body.billid,reqType:"deleteBill"};
  mq_client.make_request('admin_service_req_q',deleteBill_msg,function(results){
    res.send(results);
  });
  
}

function getRevenueGraph(req,res){
  console.log("in get revenue graph");
  getRevenueGraph_msg={reqType:"getRevenueGraph"};
  mq_client.make_request('admin_service_req_q',getRevenueGraph_msg,function(results){
    res.send(results);
  });
  
}

function getCustomerGraph(req,res){
  customerId=req.body.customerId;
  
  if(customerId===undefined || customerId===null){
    json_response={statusCode:401,message:"Customer id is undefined"};
    res.send(json_response);
  }
  getCustomerGraph_msg={customerId:customerId,reqType:"getCustomerGraph"};
  mq_client.make_request('admin_service_req_q',getCustomerGraph_msg,function(results){
    res.send(results);
  });
  
}

function getDriverGraph(req,res){
  driverId=req.body.driverId;
  
  if(driverId===undefined || driverId===null){
    json_response={statusCode:401,message:"Driver id is undefined"};
    res.send(json_response);
  }
  getDriverGraph_msg={driverId:driverId,reqType:"getDriverGraph"};
  mq_client.make_request('admin_service_req_q',getDriverGraph_msg,function(results){
    res.send(results);
  });
  
}

function getZipCodeGraph(req,res){
  zipcode=req.body.zipcode;
  
  if(zipcode===undefined || zipcode===null){
    json_response={statusCode:401,message:"Zipcode is not undefined"};
    res.send(json_response);
  }
  getZipcodeGraph_msg={zipcode:zipcode,reqType:"getZipcodeGraph"};
  mq_client.make_request('admin_service_req_q',getZipcodeGraph_msg,function(results){
    res.send(results);
  });
  
}

function getCityGraph(req,res){
  city=req.body.city;
  
  if(city===undefined || city===null){
    json_response={statusCode:401,message:"City is not undefined"};
    res.send(json_response);
  }
  getCityGraph_msg={city:city,reqType:"getCityGraph"};
  mq_client.make_request('admin_service_req_q',getCityGraph_msg,function(results){
    res.send(results);
  });
  
}

function getDrivers(req,res){
  getDrivers_msg={count:req.params.count,reqType:"getDrivers"};
  mq_client.make_request('admin_service_req_q',getDrivers_msg,function(results){
    res.send(results);
  });
  
}

function getCustomers(req,res){
  getCustomers_msg={count:req.params.count,reqType:"getCustomers"};
  mq_client.make_request('admin_service_req_q',getCustomers_msg,function(results){
    res.send(results);
  });
  
}
