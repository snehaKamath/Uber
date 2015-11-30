var Connection = require('mysql/lib/Connection');

module.exports = connection;

function connection(pool, connectionConfig)	{
	Connection.call(this, connectionConfig);
	this._pool = pool;
	
	//When ever there is an error while executing the query or using the connection, i should remove this connection from pool
	// so i register a calll back on end(will be called on fatal error) as well as error events of the connection itself...
	 this.on('end', this.removeConnectionFromPool);
	 this.on('error', function (err) {
	   if (err.fatal) {
	     this.removeConnectionFromPool();
	   }
	 });	
}

connection.prototype = Object.create(Connection.prototype);

//This will remove connection from pool...
connection.prototype.removeConnectionFromPool = function removeConnectionFromPool()	{
	  if (!this._pool) {
		    return;
	  }

	  var pool = this._pool;
	  this._pool = null; // Releasing the memory, because this connection will no longer be used..

	pool.removeConnection(this);
};

connection.generateQuery = function generateQuery(sql, values, cb)	{
	return Connection.createQuery(sql, values, cb);
}; 

//This will release `this` connection back to the connection pool...
connection.prototype.release = function release() {
	  var pool = this._pool;
	  var connection = this;
	  
	  return pool.releaseConnection(this);
};

/* I do end here because i dont want to destroy - which will terminate then and there...and in future if i want to put more requests on the same connection
 doing end will help because it will terminate connection once all the requests are served...*/
connection.prototype.endConnection = function endConnection()	{
	  return this.end();
};


