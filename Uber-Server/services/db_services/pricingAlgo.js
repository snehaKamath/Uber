/**
 * New node file
 */

/**
 * New node file
 */

exports.getRideCost = function (ride_data, callback)	{
	
	var baseScore = 18.5;
	var weight = 1;

	// Require the module 
	var Forecast = require('forecast');
	 
	// Initialize 
	var forecast = new Forecast({
	  service: 'forecast.io',
	  key: 'd06508a9dad86a3e2f4150f55402b01e',
	  units: 'celcius', // Only the first letter is parsed 
	  cache: true,      // Cache API requests? 
	  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/ 
	    minutes: 27,
	    seconds: 45
	    }
	});
	 
	// Retrieve weather information, ignoring the cache 
	forecast.get([ride_data.srcLat, ride_data.srcLong], true, function(err, srcWeather) {
		forecast.get([ride_data.destLat, ride_data.destLong], true, function(err, destWeather)	{
			calculateCost(srcWeather, destWeather);
			console.log(destWeather);			
		});
		console.log(srcWeather);
	});
	
	function calculateCost(srcWeather, destWeather)	{
		var travelDate = new Date(ride_data.requestedTime);
		
		var day = travelDate.getDay();
		
		var hours = travelDate.getHours();
		
		var srcWeather = srcWeather.currently.summary;
		
		var destWeather = destWeather.currently.summary;
		console.log("Day" + day);
		console.log("Day" + hours);		
		
		if(day == 0)	{
			if(hours > 12 && hours < 3)	{
				weight -= 0.20;
			}			
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5)	{
				weight += 0.18;
			}
			if(srcWeather == "Partly Cloudy")	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23 && ("Partly Cloudy".indexOf(srcWeather)))	{
				weight += 0.35;
			}
		}else if(day == 1)	{
			if(hours > 12 && hours < 3)	{
				weight -= 0.20;
			}			
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5)	{
				weight += 0.18;
			}
			if(srcWeather == "Partly Cloudy")	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23 || ("Partly Cloudy".indexOf(srcWeather)))	{
				weight += 0.35;
			}			
		}else if(day == 2){
			if(hours > 12 && hours < 3)	{
				weight -= 0.20;
			}			
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5)	{
				weight += 0.18;
			}
			if(srcWeather == "Partly Cloudy")	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23 || ("Partly Cloudy".indexOf(srcWeather)))	{
				weight += 0.35;
			}			
		}else if(day == 3)	{
			if(hours > 12 && hours < 3)	{
				weight -= 0.20;
			}			
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5)	{
				weight += 0.18;
			}
			if(srcWeather == "Partly Cloudy")	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23 || ("Partly Cloudy".indexOf(srcWeather)))	{
				weight += 0.35;
			}			
		}else if( day == 4)	{
			if(hours > 12 && hours < 3)	{
				weight -= 0.20;
			}			
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5)	{
				weight += 0.18;
			}
			if(srcWeather == "Partly Cloudy")	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23 || ("Partly Cloudy".indexOf(srcWeather)))	{
				weight += 0.35;
			}			
		}else if( day == 5)	{					
			if( hours > 2 && hours < 6 || ("Cold".indexOf(srcWeather) >= 0 || "Rainy".indexOf(srcWeather) >= 0))	{
				weight += 0.67;
				if("Cold".indexof(destWeather))	{
					weight += 0.23;
				}
			}
			if(hours > 12 && hours < 3)	{
				weight -= 0.1;
			}
			if(hours > 20 && hours < 22)	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23)	{
				weight += 0.35;
			}
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) || "Rainy".indexOf(destWeather) >= 0 || "Cloudy".indexOf(srcWeather))	{
				weight += 0.05;
			}
			if(("Rainy".indexOf(srcWea0ther) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 5))	{
				weight += 0.24;
			}
		}else if(day == 6)	{
			if(hours > 12 && hours < 3)	{
				weight -= 0.10;
			}			
			if(("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather)) >= 0 && distanceTravelled > 7)	{
				weight += 0.18;
			}
			if("Rainy".indexOf(srcWeather) >= 0 || "Cloudy".indexOf(destWeather) >= 0 && distanceTravelled > 7)	{
				weight += 0.15;
			}
			if(hours > 22 && hours < 23)	{
				weight += 0.46;
			}
		}				
					
		if(weight < 0.3)	{
			if(Math.random() > 0.3 && Math.random() < 0.45)	{
				baseScore += (baseScore + (weight *100 / Math.random()*0.3));
			}else {
				baseScore -= (baseScore + (weight *100 / Math.random()*0.3));
			}
			if(baseScore < 0)	{
				baseScore += baseScore;
			}			
			callback(baseScore);
			return;
		}
		
		if(weight > 0.3 || weight < 0.5)	{
			if(Math.random() > 0.17 && Math.random() < 0.67)	{
				baseScore += (baseScore + (weight *100 / Math.random()*0.3));
			}else {
				baseScore -= (baseScore + (weight *100 / Math.random()*0.3));
			}
			if(baseScore < 0)	{
				baseScore += baseScore;
			}			
			callback(baseScore);
			return;
		}
		
		if(weight > 0.38 || weight < 0.61)	{
			if(Math.random() > 0.30 && Math.random() < 0.78)	{
				baseScore += (baseScore + (weight *100 / Math.random()*0.3));
			}else {
				baseScore -= (baseScore + (weight *100 / Math.random()*0.3));
			}
			if(baseScore < 0)	{
				baseScore += baseScore;
			}			
			callback(baseScore);
			return;
		}
		
		if(weight > 0.56 || weight < 0.77)	{
			if(Math.random() > 0.3 && Math.random() < 0.75)	{
				baseScore += (baseScore + (weight *100 / Math.random()*0.3));
			}else {
				baseScore -= (baseScore + (weight *100 / Math.random()*0.3));
			}
			if(baseScore < 0)	{
				baseScore += baseScore;
			}
			callback(baseScore);
			return;
		}		
		callback(baseScore);	
	}
}

