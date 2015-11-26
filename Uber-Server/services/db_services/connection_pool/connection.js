var Connection = require('mysql/lib/Connection');
var _pool;

module.exports = connection;

function connection(pool, connectionConfig)	{
	Connection.call(this, connectionConfig);
	_pool = pool;
	
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

//Close Connection
connection.prototype.removeConnectionFromPool = function removeConnectionFromPool()	{
	  if (!this._pool) {
		    return;
	  }

	  var pool = this._pool;
	  this._pool = null; // Releasing the memory, because this connection will no longer be used..

	pool.removeConnection(this);
};

connection.prototype.release = function release() {
	  var pool = this._pool;
	  var connection = this;

	  return pool.releaseConnection(this);
};
	
connection.prototype.endConnection = function endConnection()	{
	  //this.removeConnectionFromPool();
	  return Connection.prototype.destroy.apply(this, []);	// Calling destroy method with this scope...
};


