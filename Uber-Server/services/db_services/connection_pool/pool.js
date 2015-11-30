var ConnectionConfig = require('mysql/lib/ConnectionConfig');
var Connection = require('./connection');

var MAX_NUMBER_OF_CONNECTIONS = 30;
var CONNECTION_ACQUIRE_TIMEOUT = 10000;

var CONNECTION_CONFIG = {
        host: '127.0.0.1',
        user: 'root',
        password : '',
        database : 'uber',
        multipleStatements : true
};

function pool() {
  this._freeConnections      = [];
  this._scheduledConnections      = [];
}

module.exports = pool;

pool.prototype.getConnection = function getConnection(cb) {

  var connection;
  var pool = this;

  function createConnection()	{
	    var conn = new Connection(pool, {config: new ConnectionConfig(CONNECTION_CONFIG)});

	    return conn.connect({timeout: CONNECTION_ACQUIRE_TIMEOUT}, function onConnect(err) {

	      if (err) {
	        cb(err);
	        return;
	      }

		  console.log("Pushing the connection to scheduled connections...");
	      pool._scheduledConnections.push(conn); // If i am here that means somebody requested, so i push directly to scheduled list of connections.
	      cb(null, conn);
	    });	      
  }
  
  if (this._freeConnections.length > 0) {
	  //Remove the first connection from _freeConnections array and return it if connection is still alive...
	  connection = this._freeConnections.shift();
	  connection.ping(CONNECTION_ACQUIRE_TIMEOUT, function(err)	{
		  if(err)	{
			  connection.endConnection();
			  console.log("Creating new connection - on error");
			  return createConnection();
		  }
		  console.log("Free Connection available, returning the connection");
		  cb(null, connection);
	  });
  }else	{
	  if (this._scheduledConnections.length < MAX_NUMBER_OF_CONNECTIONS) {
		  	console.log("Creating new connection - on additional request");
		  	createConnection();
	  }	  
  } 
};

pool.prototype.releaseConnection = function releaseConnection(connection) {
  var cb;
  var pool = this;

    if (this._freeConnections.indexOf(connection) !== -1) {
      // connection already in free connection pool
      // this won't catch all double-release cases
      throw new Error('Connection already released');
    } else {
      // add connection to end of free queue
      this._freeConnections.push(connection);
    }
};

pool.prototype.end = function () {
	
  while (this._scheduledConnections.length !== 0) {
	var conn = this._scheduledConnections.shift();
	conn.endConnection();
	conn = null; // release memory	
  }
  
  while (this._freeConnections.length !== 0) {
		var conn = this._freeConnections.shift();
		conn.endConnection();
		conn = null; // release memory
  }
};

//Everybody should this method for running the query...
pool.prototype.query = function (sql, values, cb) {

  var query = Connection.generateQuery(sql, values, cb);  
  var pool = this;
  
  if (this._freeConnections.length == 0 && this._scheduledConnections.length == MAX_NUMBER_OF_CONNECTIONS) {
	  process.nextTick(function(sql, values, cb) {
	  	pool.query(sql, values, cb);
	  });
	  return query;
  }	 	  

  this.getConnection(function (err, conn) {
    if (err) {
      query.on('error', function () {});
      query.end(err);
      return;
    }

    // Release connection based off event
    query.once('end', function() {
      conn.release();
    });

    //Execute the query
    conn.query(query);
  });

  //Maintained same behaviour of pool to ensure, clients using pool can get query that is being executed...
  return query;
};

pool.prototype.removeConnection = function(connection) {
	  connection._pool = null;
	  // Remove connection from scheduled connections
	  spliceConnection(this._scheduledConnections, connection);

	  // Remove connection from free connections
	  spliceConnection(this._freeConnections, connection);
	 
	  connection.endConnection();	  	  
};

function spliceConnection(array, connection) {
  var index;
  if ((index = array.indexOf(connection)) !== -1) {
    // Remove connection from all connections
    array.splice(index, 1);
  }
}
