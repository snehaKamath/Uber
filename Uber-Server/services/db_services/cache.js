/**
 * New node file
 */

var redis = require('redis');
var cachingDisabled = false;

function cache()	{
	this.client = redis.createClient(); // By default redis will create a client in 127.0.0.1 with portNumber 6379
	this.client.on('connect', function() {
	    console.log('connected');
	});
}

module.exports = cache;

cache.prototype.testMethod = function testMethod()	{
	this.client.set('framework', 'AngularJS', function(err, reply) {
		  console.log(reply);
	});
	
	this.client.get('framework', function(err, reply) {
		  console.log("Reply in redis : " + reply);
	});
	
	this.client.hmset('frameworks', {
	    'javascript': 'AngularJS',
	    'css': 'Bootstrap',
	    'node': 'Express'
	}, function(err, reply) {
		  console.log(reply);
	});
	
	this.client.send_command("keys", ["123*"], function(err, reply) {
		  console.log("Reply in redis : " + reply);
	});
};

cache.prototype.getCustomerRidesHistory = function getCustomerRidesHistory(customerId, callback)	{
	if(cachingDisabled)	{
		return;
	}
	// First Check if the CustomerID exists...
	// If exists, 
	//				fetch all the rides array for CustomerID
	//				then fetch all the rides data for each customer
	//if not exists, then fetch details from the mysql db and store it in cache and return the data
};

cache.prototype.getDriverRidesHistory = function getDriverRidesHistory(driverId, callback)	{
	if(cachingDisabled)	{
		return;
	}
};

/*
 * This API will return all the Bills of a Customer with CustomerID
 * Fetch all the Rides Set of the Customer with CustomerID
 * Fetch Ride data for each Ride ID/Bill ID , return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
cache.prototype.getAllBillsForCustomer = function getAllBillsForCustomer(customerID)	{
	if(cachingDisabled)	{
		return;
	}		
};

/*
 * This API will return all the Bills of a Driver with DriverID
 * Fetch all the Rides Set of the Driver with DriverID
 * Fetch Ride data for each Ride ID/Bill ID, return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
cache.prototype.getAllBillsForDriver = function getAllBillsForDriver(driverID)	{
	if(cachingDisabled)	{
		return;
	} 		
};

/*
 * This API will return all the Bills of a Driver with DriverID
 * Fetch all the Rides Set of the Driver with DriverID
 * Fetch Ride data for each Ride ID/Bill ID, return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
cache.prototype.getBill = function getAllBillsForDriver(billID)	{
	if(cachingDisabled)	{
		return;
	} 		
};

/*
 * This API will be called when ever a ride should be added to the customer.
 * First add the Ride ID to CustomerID HashMap, which will be used later to fetch all the rides of this CustomerID...
 * Create a RideID Hash Map, where RideID is the key(getOperation will be of [O(N) + 1] Complexity)... 
 * Insert data into HashMap for each RideID...
 * */
//cache.prototype.putCustomerRidesHistory = function putCustomerRidesHistory(customerId, rows, callback)	{
cache.prototype.putCustomerRide = function putCustomerRidesHistory(customerId, rows, callback)	{
	if(cachingDisabled)	{
		return;
	}
};

/*
 * This API will be called when ever a ride should be added to the customer.
 * First add the Ride ID to CustomerID HashMap, which will be used later to fetch all the rides of this CustomerID...
 * Create a RideID Hash Map, where RideID is the key(getOperation will be of [O(N) + 1] Complexity) 
 * */
//cache.prototype.putDriverRidesHistory = function putDriverRidesHistory(driverId, rows, callback)	{
cache.prototype.putDriverRide = function putDriverRidesHistory(driverId, rows, callback)	{
	if(cachingDisabled)	{
		return;
	}
};

/*
 * This API will be called Asynchronously as part of application start up.
 * Create a Set of Ride ID's for each Customer, where key is CustomerID and values will be Set of Ride ID's.
 * Create a Set of Ride ID's for each Driver, where key is DriverID and values will be Set of Ride ID's.
 * Create a Hash Map with key as RideID and value as Column from the Table.
 * */
cache.prototype.putAllBills = function putAllBills(data)	{
	if(cachingDisabled)	{
		return;
	}		
};
