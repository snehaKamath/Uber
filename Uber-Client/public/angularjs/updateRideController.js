var uberApp = angular.module('uberApp');
uberApp.controller("updateRideController",function($scope,$http,$window,$state,NgMap,$interval,$stateParams, uberService){
	var Map;
	var source_address = {};
	var destination_address = {};
	var driverData = {};
	$scope.ridesHistory = [];
	$scope.driverReviews = [];
	$scope.noScroll = false;
	$scope.count = 0;

	NgMap.getMap().then(function(map) {
	    Map = map;
	  });
	console.log($stateParams.rideId);
	console.log("Ride ID is" +uberService.getRideId());
	$interval(function(){
		$http.get('/getCurrentRide').success(function(response) {
				console.log(JSON.stringify("Response I got at controller "+JSON.stringify(response)));
				if(response.status==200){
					console.log(JSON.stringify("Response I got at controller "+JSON.stringify(response)));
					$scope.currentRide = response.value;
					$scope.origin = [response.value.SOURCE_LOCATION.x, response.value.SOURCE_LOCATION.y];
					console.log($scope.origin);
					$scope.destination = [response.value.DESTINATION_LOCATION.x, response.value.DESTINATION_LOCATION.y];
					var status=response.value.RIDE_STATUS;
				  	console.log(status);
				  	if(status ==0 || status == 1){
				  		$scope.disableSource=false;
				  	
				  		$scope.disableSource=true;
				  	}
				  	else{
				  		uberService.setRideHider(true);
				  		$state.go('createRide');
				  	}
				}
			 }, function() {
			});
	}, 10000);
	
	$scope.deleteRide=function(){
		var rideId=$scope.currentRide.RIDE_ID;
		$http({
			method : "POST",
			url : '/deleteCustomerRide',
			data : {
				"rideId" : rideId
			}
			}).success(function(result) {
			if(result.statusCode == 200){
				uberService.setRideHider(false);
				$state.go('createRide');
			}
			else if(result.statusCode == 401)
			{
				$scope.userMessage=result.message;
			}
			}).error(function(error) {
				alert("Unknown error.Please try again later");
		});
	}
	
	function getAddress(location, callback){
		  if(location.length >= 5 && typeof google != 'undefined'){
		    var addr = {};
		    var geocoder = new google.maps.Geocoder();
		    geocoder.geocode({ 'address': location }, function(results, status){
		    	console.log("results" +JSON.stringify(results));
		        addr.lat = results[0].geometry.location.lat();
		        addr.lng = results[0].geometry.location.lng()
		      if (status == google.maps.GeocoderStatus.OK){
		        if (results.length >= 1) {
			  for (var ii = 0; ii < results[0].address_components.length; ii++){
			    var street_number = route = street = city = state = zipcode = country = formatted_address = '';
			    var types = results[0].address_components[ii].types.join(",");
			    if (types == "street_number"){
			      addr.street_number = results[0].address_components[ii].long_name;
			    }
			    if (types == "route" || types == "point_of_interest,establishment"){
			      addr.street_name = results[0].address_components[ii].long_name;
			    }
			    if (types == "sublocality,political" || types == "locality,political" || types == "neighborhood,political" || types == "administrative_area_level_3,political"){
			      addr.city = (city == '' || types == "locality,political") ? results[0].address_components[ii].long_name : city;
			    }
			    if (types == "administrative_area_level_1,political"){
			      addr.state = results[0].address_components[ii].short_name;
			    }
			    if (types == "postal_code" || types == "postal_code_prefix,postal_code"){
			      addr.zipcode = results[0].address_components[ii].long_name;
			    }
			    if (types == "country,political"){
			      addr.country = results[0].address_components[ii].long_name;
			    }
			  }
			  addr.success = true;
			  
			  if(!(addr.hasOwnProperty("street_number"))){
				  addr.street_number = "";
			  }
			  if(!(addr.hasOwnProperty("street_name"))){
				  addr.street_name = "";
			  }
			  if(!(addr.hasOwnProperty("city"))){
				  addr.city = "";
			  }
			  if(!(addr.hasOwnProperty("state"))){
				  addr.state = "";
			  }
			  if(!(addr.hasOwnProperty("zipcode"))){
				  addr.zipcode = null;
			  }
			  if(!(addr.hasOwnProperty("country"))){
				  addr.country = "";
			  }
			  console.log(addr);
			  callback(addr);
		        } else {
		          response({success:false});
		        }
		      } else {
		        response({success:false});
		      }
		    });
		  } else {
		    callback({success:false});
		  }
	}
	$scope.updateRide=function(destination){
				$scope.destination = destination;
				 getAddress(destination, function(response){
					 $scope.errorDialog = false;
						if(response.success){
							destination_address = response;
							var source = new google.maps.LatLng(source_address.lat, source_address.lng);
						    var dest = new google.maps.LatLng(destination_address.lat, destination_address.lng);
						    var distance = Map.directionsRenderers[0].directions.routes[0].legs[0].distance.value * 0.000621371;
							locations = {
										destination_location : {lat : destination_address.lat, lng : destination_address.lng}};
							rideData = {
									"destination_street" : destination_address.street_number,
									"destination_area" : destination_address.street_name,
									"destination_city" : destination_address.city,
									"destination_state" : destination_address.state,
									"destination_zipcode" : destination_address.zipcode,
									"distance" : distance,
									
						
							};
						    $http.post('/updateCustomerRide', {"rideId" : $scope.currentRide.RIDE_ID, "locations" : locations, "rideData" : rideData}).success(function(result) {
						    	   console.log("result " +result);
									if(result.status == 200)
										console.log("Successful");
										else
											console.log("Not successful");
								
							});
						}
				 });
	}
});