
var amqp = require('amqp');
var adminModule = require('./services/app_services/admin');
var billModule = require('./services/app_services/bill');
var customerModule = require('./services/app_services/customer');
var driverModule = require('./services/app_services/driver');
var ridesModule = require('./services/app_services/rides');
var signInModule = require('./services/app_services/signIn');
var signUpModule = require('./services/app_services/signUp');

//Initialize mongoDB and save the reference for other services to use.....
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/uber_db";
MongoClient.connect(url, function(err, _db){
	if (err) { throw new Error('Could not connect: '+err); }
    console.log("Successfully connectied to Mongo DB in Server");
    global.db = _db;
});

//Initialize RabbitMQ connection
var connection = amqp.createConnection({host:'localhost'});

connection.on('ready', function(){
	
	console.log("listening on admin_service_req_q");
	connection.queue('admin_service_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			
			adminModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});				
	});
	
	console.log("listening on bill_service_req_q");
	connection.queue('bill_service_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){			
			
			billModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});				
	});
	
	console.log("listening on customer_service_req_q");
	connection.queue('customer_service_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){			
			
			customerModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});				
	});
	
	console.log("listening on driver_service_req_q");
	connection.queue('driver_service_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){			
			
			driverModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});				
	});
	
	console.log("listening on rides_service_req_q");
	connection.queue('rides_service_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){			
			
			ridesModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});				
	});
	
	console.log("listening on signup_req_q");
	connection.queue('signup_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			
			signUpModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

	console.log("listening on signin_req_q");
	connection.queue('signin_req_q', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			
			signInModule.handle_request(message, function(response){

				console.log("publishing to " + m.replyTo);
				connection.publish(m.replyTo, response, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});		
	});	
});

