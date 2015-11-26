
module.exports = function (app)	{	
	  app.get('/partials/:name', partials);
	  app.get('/', root);     // sneha : app.get('/partials/:name', routes.partials); should always be first and all remaining routes should be below that
	  app.get('/admin',	adminSignIn);
	  app.get('/customerSignIn',	customerSignIn);
	  app.get('/home',	homePage);
	  app.get('/driverSignUp',	driverSignUp);
	  app.get('/customerSignUp', customerSignUp);
};

<<<<<<< HEAD
function root(req, res)
{
	res.render('driverSignIn');
=======
function root(req, res)	{	
	res.render('driverSignUp');
>>>>>>> 3d7a2ae7127bff8056fd9cf29e424e6b1c3f78a9
}

function adminSignIn(req, res) {
  res.render('adminSignIn');  
}

function customerSignUp(req, res)	{	
	res.render("customerSignUp");	
}

function customerSignIn(req,res)	{	
	  res.render('customerSignIn');
}

function driverSignUp(req,res)	{	
	res.render('driver_signup');	
}

function homePage(req,res)	{	
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

function partials(req, res) 	{
	var name = req.params.name;
	res.render('partials/' + name);
}


