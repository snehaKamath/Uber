
module.exports = function (app)	{	
	  app.get('/partials/:name', partials);
	  app.get('/', root);     // sneha : always put this line under app.get('/partials/:name', routes.partials);
	  app.get('/admin',adminSignIn);
	  app.get('/customer',customerSignIn);
	  app.get('/home',homePage);
	  app.get('/homePage',homePage);
	  app.get('/driver',driversignup);
};

function root(req, res)
{
	res.render('driverSignIn');
}

function adminSignIn(req, res) 
{
  res.render('adminSignIn');
}
function customerSignIn(req,res){
	
	  res.render('customerSignIn');
	}
function driversignup(req,res)	
{
	res.render('driver_signup');	
}

function homePage(req,res)
{	
	if(req.session.adminEmailid)	{
		res.render('adminHome');
	}
	else if(req.session.driverId)	{
		res.render('driverHome');	
	}
	else if(req.session.customerId)	{
		res.render('customerHome');
	}
	else	{
		res.redirect('/');		
	}
}

function partials(req, res) 
{
	var name = req.params.name;
	res.render('partials/' + name);
}


