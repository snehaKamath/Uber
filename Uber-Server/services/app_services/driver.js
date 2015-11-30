/**
 * New node file
 */

exports.handle_request = function(message, callback)	{
	if(message.reqType === "driverLocations")		{ 
		getDriverLocation(message, callback);
	}
if(message.reqType === "driverriderequest")		{ 
		
	getriderequest(message,callback);
	}
	if(message.reqType === "getDriverProfile")	
	{ 
		
		getDriverProfile(message,callback);
	}
	if(message.reqType === "updateDriverDetails")		
	{ 
		
		updateDriverDetails(message,callback);
	
	}
};
function getDriverLocation(message, callback){
	console.log("In service");
	
	 // message.pickupLng = '80.79567559999998'; 
	  //message.pickupLat = '16.5271931';
	   location = [Number(message.pickupLng), Number(message.pickupLat)];
	   console.log(location);
		driverDAO.getDriverLocation(location, function(response){

			callback(response);
	});			
}
function getriderequest(message,callback){
	  
	driverDAO.getriderequest({id:message.id},function(response){
		callback(response);
	});
	  
};
function getDriverProfile(message,callback){
	  
	var ssn=message.ssn;
	var res={};
	console.log(ssn);
	
	driverDAO.getDriverProfile(ssn,function(results){
		if(results){
			res.code=200;
			res.value=results;
			callback(res);
		}
		else{
			res.code=401;
			res.value="No records found";
			callback(res);
		}
	});
	  
};
function updateDriverDetails(message,callback){
	var firstName=message.data[0];
	var lastName=message.data[1];
	var address=message.data[2];
	var city=message.data[3];
	var state=message.data[4];
	var zip_primary=message.data[5];
	var zip_secondary=message.data[6];
	var phone=message.data[7];
	var email=message.data[8];
	var ssn=message.ssn;
	var status=0;
	var myuser = [];
	var res={};
	driverDAO.updateDriverDetails(ssn,firstName,lastName,address,city,state,zip_primary,zip_secondary,phone,email,function(results){
		if(results){
			res.code=200;
			res.value="Successfully Updated";
			callback(res);
		}
		else{
			res.code=401;
			res.value="No records found";
			callback(res);
		}
	});
	  
};


