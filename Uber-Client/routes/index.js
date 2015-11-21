
/*
 * GET Root Page Application
 */

module.exports = function (app)	{	
  app.get('/partials/:name', partials);
  app.post('/', root);     // sneha : always put this line under app.get('/partials/:name', routes.partials);
	app.get('/admin',adminSignIn);
	app.get('/homePage',homePage);
};

function root(req, res) {
  res.render('index', {title:'Uber'});
}

function adminSignIn(req, res) {
  res.render('adminSignIn');
}

function homePage(req,res){
  res.render('homePage');
}

function partials(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
}

