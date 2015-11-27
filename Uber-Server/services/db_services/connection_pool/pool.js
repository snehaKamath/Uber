var Lib_Connection = require('mysql/lib/Connection');
var Connection = require('./connection');
var MAX_NUMBER_OF_CONNECTIONS = 30;
var connectionAcquireTimeOut = 1000;

var connection_config = {
        host: '127.0.0.1',
        user: 'root',
        password : '',
        database : 'uber',
        multipleStatements : true
};

function pool(options) {

  this._freeConnections      = [];
  this._scheduledConnections      = [];
}

module.exports = pool;

pool.prototype.getConnection = function getConnection(cb) {

  var connection;
  var pool = this;

  function createConnection()	{
	    var conn = new Connection(this, connection_config);

	    return conn.connect(function onConnect(err) {

	      if (err) {
	        cb(err);
	        return;
	      }

		  console.log("Pushing the connection to scheduled connections...");
	      this._scheduledConnections.push(conn); // If i am here that means somebody requested, so i push directly to scheduled list of connections.
	      cb(null, conn);
	    });	      
  }
  
  if (this._freeConnections.length > 0) {
	  //Remove the first connection from _freeConnections array and return it if connection is still alive...
	  connection = this._freeConnections.shift();
	  connection.ping(connectionAcquireTimeOut, function(err)	{
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

pool.prototype.end = function (cb) {
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

pool.prototype.query = function (sql, values, cb) {
	  
  var query = Connection.createQuery(sql, values, cb);
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

    conn.query(query);
  });

  return query;
};

pool.prototype._removeConnection = function(connection) {
  connection._pool = null;

  // Remove connection from all connections
  spliceConnection(this._allConnections, connection);

  // Remove connection from free connections
  spliceConnection(this._freeConnections, connection);

  this.releaseConnection(connection);
};

function spliceConnection(array, connection) {
  var index;
  if ((index = array.indexOf(connection)) !== -1) {
    // Remove connection from all connections
    array.splice(index, 1);
  }
}
