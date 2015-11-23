
/*
 * GET Root Page Application
 */

module.exports = function (app)	{	
	app.get('/', root);
};

function root(req, res){
  res.render('driver_signup', { title: 'Express' });
}