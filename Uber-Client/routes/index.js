
/*
 * GET Root Page Application
 */

module.exports = function (app)	{	
	app.post('/', root);
};

function root(req, res){
  res.render('index', { title: 'Express' });
}