/**
 * New node file
 */

exports.insert = function (collectionName, query, callback){
	var collection = global.mongoDB.collection(collectionName);
	collection.insert(query, function(err,res){		
		callback(err, res);		
	});	
};

exports.update = function (collectionName, query, callback){
	var collection = global.mongoDB.collection(collectionName);
	collection.update(query, function(err,res){		
		callback(err, res);		
	});	
};

exports.findOne = function (collectionName, query, callback){
	var collection = global.mongoDB.collection(collectionName);
	collection.findOne(query, function(err,res){		
		callback(err, res);		
	});	
};

exports.find = function (collectionName, query){
	var collection = global.mongoDB.collection(collectionName);
	return collection.find(query);	
};

