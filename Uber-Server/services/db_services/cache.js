/**
 * New node file
 */

var redis = require('redis');
var async = require('async');
var cachingDisabled = false;
var MAXIMUM_SUPPORTED_ROWS = 10000;

function cache()	{
	this.client = redis.createClient(); // By default redis will create a client in 127.0.0.1 with portNumber 6379
	var self = this;
	this.client.on('connect', function() {
	    console.log('connected');
	});	
}

module.exports = cache;

cache.prototype.testMethod = function testMethod()	{

	var first = Date.parse('2015-11-21 21:15:30');
	var second = Date.parse('2015-11-22 21:15:30');
	var third = Date.parse('2015-11-23 21:15:30');
	var forth = Date.parse('2015-11-24 21:15:30');
	var fifth = Date.parse('2015-11-25 21:15:30');

	var args = [1, first, 2, second, 3, third, 4, forth, 5, fifth, 6];
	
	console.log(args);
	
	this.client.zadd(args, function(err, reply) {    	
		  console.log("Reply in redis : " + reply);
	});    

  /*this.client.smembers("tags", function(err, reply) {
  	console.log("Reply in redis : " + reply);
  	console.log("Reply in redis 0: " + reply[0]);
  	console.log("Reply in redis 1: " + reply[1]);
		  console.log("Reply in redis length: " + reply.length);
	});*/
  	var q = async.queue(function (task, callback) {
	    task(callback);
	}, 2);

	// assign a callback
	q.drain = function(i) {
	    console.log("I : " + i);
	}

	// add some items to the queue

	function insert(callback)	{
		var i =2;
		callback(i);
	}
	
	function fetch(callback)	{
		var i =1;
    	callback(i);
	}
	
	q.push([insert, fetch], function (err) {
	    console.log(err);
	});
	
/*	var functions = [];
	for (var i = 0; i < 2000; i++) {
		functions.push(function(i)	{
			console.log(i)
		});
	}
	async.parallel(functions, function(err, reply)	{
		console.log(reply);
	});
*//*	async.map(lookup_list, function(i, callback) {
		console.log("I = " + i);
		callback(null, i);
	}, function(err, results) {
	    //console.log(results);	    
	});
*//*	process. (function()	{
	    async.parallel([function(callback)	{
	    	setTimeout(function()	{
	        	var i = 0;
	    		while( i < 10000)	{
	    			console.log(i);
	    			i++;
	    		}		
	    		callback(null, i);	    		
	    	});
	    }, function(callback)	{
	    	setTimeout(function()	{
	        	var i = 0;
	    		while( i < 10000)	{
	    			console.log(i);
	    			i++;
	    		}		
	    		callback(null, i);	    		
	    	});
	    }, function(callback)	{
	    	setTimeout(function()	{
	        	var i = 0;
	    		while( i < 10000)	{
	    			console.log(i);
	    			i++;
	    		}		
	    		callback(null, i);	    		
	    	});
	    }, function(callback)	{
	    	setTimeout(function()	{
	        	var i = 0;
	    		while( i < 10000)	{
	    			console.log(i);
	    			i++;
	    		}		
	    		callback(null, i);	    		
	    	});
	    }], function(err, results)	{
	    	console.log(results);
	    });		
	})*/
	
/*    async.parallel([function(callback)	{
       	self.client.hgetall('frameworks', function(err, reply)	{
       		var i =0;
    		while(i<10000000)	{
    			i++;
    		}
    		console.log("i = " + i);       		
    		console.log(reply);
    		console.log(reply.javascript);
    		console.log(reply.css);
        	callback(null, "Finished Fetch");
    	});    		    	
    	setTimeout(function()	{
    		var i =0;
    		while(i<10000000)	{
    			i++;
    		}
    		console.log("i = " + i);
        	self.client.hmset('frameworks', {
        	    'javascript': 'AngularJS_New',
        	    'css': 'Bootstrap_New',
        	    'node': 'Express_New'
        	}, function(err, reply) {
        		  console.log(reply);        	    		 
        	      callback(null, "Finished Insert");
        	});    		
    	}, 100);
    }, function(callback)	{
    	console.log("Inside Insert...");
    	callback(null, "Finished Insert..");
    	self.client.hmset('frameworks', {
    	    'javascript': 'AngularJS_New',
    	    'css': 'Bootstrap_New',
    	    'node': 'Express_New'
    	}, function(err, reply) {
    		  console.log(reply);
    	    	callback(null, "Finished Insert");
    	});
    	setTimeout(function()	{
        	self.client.hgetall('frameworks', function(err, reply)	{
        		var i =0;
        		while(i<1000000)	{
        			i++;
        		}
        		console.log("i = " + i);        		
        		console.log(reply);
        		console.log(reply.javascript);
        		console.log(reply.css);
            	callback(null, "Finished Fetch");
        	});    		
    	}, 50);
    }], function(err, results)	{
    	console.log("Optional Function");
    	console.log(results);
    });
*/
    /*this.client.sadd("new_tags", "harish" ,function(err, reply) {    	
		  console.log("Reply in redis : " + reply);
	});    

    this.client.smembers("tags", function(err, reply) {
    	console.log("Reply in redis : " + reply);
    	console.log("Reply in redis 0: " + reply[0]);
    	console.log("Reply in redis 1: " + reply[1]);
		  console.log("Reply in redis length: " + reply.length);
	});  */  
/*	
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
	
	this.client.hgetall('frameworks', function(err, reply)	{
		console.log(reply);
		console.log(reply.javascript);
		console.log(reply.css);
	});
	
	this.client.send_command("keys", ["123*"], function(err, reply) {
		  console.log("Reply in redis : " + reply);
	});*/
};

cache.prototype.init = function()	{
	var self = this;
	mysql_pool.query("SELECT * FROM RIDES", function(err, rows)	{
		if(err)	{
			console.log("Cache was not initialized properly");
		}else	{
			if(rows)	{
				self.putAllRides(rows); // U can also access this API using putAllBills();
			}
		}
	});
};

/*
 * This API will return all the Bills of a Customer with CustomerID
 * Fetch all the Rides Set of the Customer with CustomerID
 * Fetch Ride data for each Ride ID/Bill ID , return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
cache.prototype.getDriverRidesHistory = cache.prototype.getAllBillsForDriver = cache.prototype.getCustomerRidesHistory = cache.prototype.getAllBillsForCustomer = 
	function (id, options, callback)	{
		if(cachingDisabled)	{
			return;
		}
		
		var _options = options;
		if(typeof options == undefined || options == null)	{
			_options = {
				start : 0,
				end : 10
			};
		}
		
		var self = this;	
		this.client.exists(id, function(err, reply)	{
			if(reply === 1)	{
				var args = [id, _options.start, _options.end];
				self.client.zrange(args, function(err, ridesSet)	{
					fetchRides(self.client, ridesSet, callback);				
				});
			}else	{
				var empty = [];
				callback(err, empty);
			}
		});		
};


/*
 * This API will return all the Bills of a Driver with DriverID
 * Fetch all the Rides Set of the Driver with DriverID
 * Fetch Ride data for each Ride ID/Bill ID, return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
/*cache.prototype.getDriverRidesHistory = cache.prototype.getAllBillsForDriver = function (driverID, options, callback)	{
	if(cachingDisabled)	{
		return;
	} 	
	
	var _options = options;
	if(typeof options == undefined || options == null)	{
		 _options = {
			start : 0,
			end : 10
		};
	}
	
	var self = this;
	this.client.exists(driverID, function(err, reply)	{
		if(reply === 1)	{
			var args = [driverID, _options.start, _options.end];			
			self.client.zrange(args, function(err, ridesSet)	{
				fetchRides(ridesSet);				
			});		
		}else	{
			var empty = [];
			callback(err, empty);
		}
	});				
};
*/
/*
 * This API will return all the Bill based on the billID
 * Fetch all the Rides Set of the Driver with DriverID
 * Fetch Ride data for each Ride ID/Bill ID, return the final data <Run the iteration using hgetall where hash is Ride ID/Bill ID>
 * */
cache.prototype.getBill = cache.prototype.getRide = function (billID, callback)	{
	if(cachingDisabled)	{
		return;
	} 		
	
	var self = this;
	this.client.exists(billID, function(err, reply)	{
		if(reply === 1)	{
			self.client.hmget(billID, function(err, rideData)	{
				callback(err, rideData);
			});
		}else	{
			var empty = [];
			callback(err, empty);
		}
	});			
};

/*
 * This API will be called when ever a ride should be added to the customer.
 * First add the Ride ID to CustomerID Set, which will be used later to fetch all the rides of this CustomerID...
 * Create a RideID Hash Map, where RideID is the key(getOperation will be of [O(N) + 1] Complexity)... 
 * Insert data into HashMap for each RideID...
 * */
cache.prototype.putCustomerRide = function (customerId, data, cb)	{
	if(cachingDisabled)	{
		return;
	}
	
	var self = this;
	async.parallel([function(callback) {
		/* Customer ID is Hash, Requested Time is the Score and Ride ID is the value to which score is assigned */
		updateCustomerSet(self.client, customerId, data, callback);		
		},		
		function(callback)	{								
			updateRideMap(self.client, data, callback);
	}], function(err, results) {
			console(results);
			if(typeof cb === 'function')	{
				cb(err, results);
			}
	});
};

/*
 * This API will be called when ever a ride should be added to the customer.
 * First add the Ride ID to CustomerID Set, which will be used later to fetch all the rides of this CustomerID...
 * Create a RideID Hash Map, where RideID is the key(getOperation will be of [O(N) + 1] Complexity) 
 * */
cache.prototype.putDriverRide = function (driverId, data, cb)	{
	if(cachingDisabled)	{
		return;
	}

	var self = this;
	async.parallel([function(callback) {
		/* Driver ID is Hash, Requested Time is the Score and Ride ID is the value to which score is assigned */		
			updateCustomerSet(self.client, driverId, data, callback);
		},		
		function(callback)	{
			/* Update Hash Map of Ride ID */					
			updateRideMap(self.client, data, callback);
	}], function(err, results) {
			console(results);
			if(typeof cb === 'function')	{
				cb(err, results);
			}
	});	
};

/*
 * This API will be called Asynchronously as part of application start up.
 * Create a Set of Ride ID's for each Customer, where key is CustomerID and values will be Set of Ride ID's.
 * Create a Set of Ride ID's for each Driver, where key is DriverID and values will be Set of Ride ID's.
 * Create a Hash Map with key as RideID and value as Column from the Table.
 * */
cache.prototype.putAllRides = cache.prototype.putAllBills = function (data)	{
	if(cachingDisabled)	{
		return;
	}	
	
	var self = this;
	
/*	if(data.length > MAXIMUM_SUPPORTED_ROWS)	{
		var largeData = [];   // assume this has 100 or more email addresses in it
		var shortArrays = [], i, len;

		for (i = 0, len = longArray.length; i < len; i += 10) {
		    shortArrays.push(longArray.slice(i, i + 10));
		}

		async.map(data, function(dataEntry, callback) {
			this.putDriverRide(dataEntry.DRIVER_ID, dataEntry);
			this.putCustomerRide(dataEntry.CUSTOMER_ID, dataEntry);
		}, function(err, results) {
		    //console.log(results);	    
		});		
	}*/
	
	async.map(data, function(dataEntry, callback) {
		updateCustomerSet(self.client, dataEntry.DRIVER_ID, dataEntry, callback);
		updateRideMap(self.client, dataEntry, callback);
		//self.putDriverRide(dataEntry.DRIVER_ID, dataEntry);
		//self.putCustomerRide(dataEntry.CUSTOMER_ID, dataEntry);
	}, function(err, results) {
	    console.log(results);	    
	});	
};

function updateCustomerSet(client, id, data, callback)	{
	var args = [ id, data.REQUESTED_TIME, data.RIDE_ID ]; 
	client.zadd(args, function(err, reply)	{
		console.log("Reply : " + reply);
		callback(null, "Inserted Ride ID " + data.RIDE_ID + " for ID " +id);
	});	
}

function updateRideMap(client, data, callback)	{	
	client.hmset(data.RIDE_ID, {RIDE_ID : data.RIDE_ID/* Add all remaining columns*/}, function(err, reply)	{
		callback(null, "Ride/Bill details that are inserted into the cache for the Ride ID : " + data.RIDE_ID + " is " + reply);				
	});	
}

function fetchRides(client, ridesSet, callback)	{
	if(ridesSet.length > MAXIMUM_SUPPORTED_ROWS)	{
		
		function split(ridesSet, callback) {
			split(ridesSet, callback);
		}

		function fetch(splicedRidesSet, callback) {
			async.map(splicedRidesSet, function(chunkRideArray, callback)	{
				async.map(chunkRideArray, function(ride, callback)	{
					client.hgetall(ride, function(err, entry)	{
						callback(null, entry);
					});
				}, function(err, results)	{
					callback(err, results);
				});
			}, function(err, results)	{
					callback(err, results);
			});
		}

		var splitAndFetch = async.compose(fetch, split);

		splitAndFetch(ridesSet, function (err, result) {
			callback(err, result);
		});			
	}
	
	async.parallel(function()	{
		async.map(ridesSet, function(ride, cb)	{
				client.hgetall(ride, function(err, entry)	{
					cb(null, entry);
				});
			}, function(err, results)	{
				callback(err, results);
		});		
	}, function(err, reply)	{
		
	});
}

function split(a, callback) {
	var n = MAXIMUM_SUPPORTED_ROWS;
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i + size));
        i += size;
    }
    callback(out);
}
