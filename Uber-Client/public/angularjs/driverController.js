uberApp = angular.module('uberApp');
uberApp.controller("driverController",function($scope, $state, $http, $window){
	function malformed_state_exception(){
		
	}
	//first name
	$scope.firstname_typeerror=true;
	$scope.firstname_sizeerror=true;
	$scope.firstname_emptyerror=true;
	//last name
	$scope.lastname_typeerror=true;
	$scope.lastname_sizeerror=true;
	$scope.lastname_emptyerror=true;
	//address
	$scope.address_sizeerror=true;
	$scope.address_emptyerror=true;
	//city
	$scope.city_typeerror=true;
	$scope.city_sizeerror=true;
	$scope.city_emptyerror=true;
	//zip code
	$scope.zip_typeerror=true;
	$scope.zip_sizeerror=true;
	$scope.zip_emptyerror=true;
	$scope.zip2_sizeerror=true;
	//Phone
	$scope.phone_typeerror=true;
	$scope.phone_sizeerror=true;
	$scope.phone_emptyerror=true;
	//Email
	$scope.email_typeerror=true;
	$scope.email_sizeerror=true;
	$scope.email_emptyerror=true;
	//state
	$scope.state_typeerror=true;
	$scope.state_sizeerror=true;
	$scope.state_emptyerror=true;
	$scope.state_invaliderror=true;
	//password
	$scope.password_sizeerror=true;
	$scope.password_emptyerror=true;
		$scope.submit = function() {
			//first name
			$scope.firstname_typeerror=true;
			$scope.firstname_sizeerror=true;
			$scope.firstname_emptyerror=true;
			//last name
			$scope.lastname_typeerror=true;
			$scope.lastname_sizeerror=true;
			$scope.lastname_emptyerror=true;
			//address
			$scope.address_sizeerror=true;
			$scope.address_emptyerror=true;
			//city
			$scope.city_typeerror=true;
			$scope.city_sizeerror=true;
			$scope.city_emptyerror=true;
			//zip code
			$scope.zip_typeerror=true;
			$scope.zip_sizeerror=true;
			$scope.zip_emptyerror=true;
			$scope.zip2_sizeerror=true;
			//Phone
			$scope.phone_typeerror=true;
			$scope.phone_sizeerror=true;
			$scope.phone_emptyerror=true;
			//Email
			$scope.email_typeerror=true;
			$scope.email_sizeerror=true;
			$scope.email_emptyerror=true;
			//state
			$scope.state_typeerror=true;
			$scope.state_sizeerror=true;
			$scope.state_emptyerror=true;
			$scope.state_invaliderror=true;
			var error="";
			var regExpNumber=/^[0-9]*$/;
			var regExpCharacter=/^[a-z A-Z]*$/;
			
			//first name checking	Checking for empty field.
			if($scope.customer_firstname=='' || $scope.customer_firstname==undefined)
			{
				$scope.firstname_emptyerror=false;
				error+=true;
			}
			else{
				$scope.firstname_emptyerror=true;
				//checking for length in firstname
				if($scope.customer_firstname.length>24){
					$scope.firstname_sizeerror=false;
					error+=true;
				}
				else{
					$scope.firstname_sizeerror=true;
					//checking illegal characters in first name 
					if(!regExpCharacter.test($scope.customer_firstname)){
						$scope.firstname_typeerror=false;
						error+=true;
					}
					else{
						$scope.firstname_typeerror=true;
					}
				}
			}
			//last name checking
			if($scope.customer_lastname=='' || $scope.customer_lastname==undefined)
			{
				$scope.lastname_emptyerror=false;
			}
			else{
				$scope.lastname_emptyerror=true;
				//checking for length in lastname
				if($scope.customer_lastname.length>24){
					$scope.lastname_sizeerror=false;
					error+=true;
				}
				else{
					$scope.lastname_sizeerror=true;
					//checking illegal characters in last name 
					if(!regExpCharacter.test($scope.customer_lastname)){
						$scope.lastname_typeerror=false;
						error+=true;
					}
					else{
						$scope.lastname_typeerror=true;
					}
				}
			}
			//Address checking
			if($scope.customer_address=='' || $scope.customer_address==undefined)
			{
				$scope.address_emptyerror=false;
				error+=true;
			}
			else{
				$scope.address_emptyerror=true;
				//checking address length
				if($scope.customer_address.length>128){
					$scope.address_sizeerror=false;
					error+=true;
				}
				else{
					$scope.address_sizeerror=true;
				}
			}
			//city checking
			if($scope.customer_city=='' || $scope.customer_city==undefined)
			{
				$scope.city_emptyerror=false;
			}
			else{
				$scope.city_emptyerror=true;
				if($scope.customer_city.length>32){
					$scope.city_sizeerror=false;
					error+=true;
				}
				else{
					$scope.city_sizeerror=true;
					if(!regExpCharacter.test($scope.customer_city)){
						$scope.city_typeerror=false;
						error+=true;
					}
					else{
						$scope.city_typeerror=true;
					}
				}
			}
			//zip code checking
			if($scope.customer_zip_1=='' || $scope.customer_zip_1==undefined)
			{
				$scope.zip_emptyerror=false;
				error+=true;
			}
			else{
				$scope.zip_emptyerror=true;
				if($scope.customer_zip_1.toString().length!=5){
					$scope.zip_sizeerror=false;
					error+=true;
				}
				else{
					$scope.zip_sizeerror=true;
					if(!regExpNumber.test($scope.customer_zip_1)){
						$scope.zip_typeerror=false;
						error+=true;
					}
					else{
						$scope.zip_typeerror=true;
					}
				}
			}
			
			if($scope.customer_zip_2!='' && $scope.customer_zip_2!=undefined){
				if($scope.customer_zip_2.toString().length!=4){
					$scope.zip2_sizeerror=false;
					error+=true;
				}
				else{
					$scope.zip2_sizeerror=true;
				}
			}
			//Phone number checking
			if($scope.customer_phone_number=='' || $scope.customer_phone_number==undefined )
			{
				$scope.phone_emptyerror=false;
				error+=true;
			}
			else{
				$scope.phone_emptyerror=true;
				if($scope.customer_phone_number.toString().length!=10){
					$scope.phone_sizeerror=false;
					error+=true;
				}
				else{
					$scope.phone_sizeerror=true;
					if(!regExpNumber.test($scope.customer_phone_number)){
						$scope.phone_typeerror=false;
						error+=true;
					}
					else{
						$scope.phone_typeerror=true;
					}
				}
			}
			//Email ID checking
			if($scope.customer_email=='' || $scope.customer_email==undefined)
			{
				$scope.email_emptyerror=false;
				error+=true;
			}
			else{
				$scope.email_emptyerror=true;
				if($scope.customer_email.length>32){
					$scope.email_sizeerror=false;
					error+=true;
				}
				else{
					$scope.email_sizeerror=true;
					/*if(!regExpNumber.test($scope.customer_email)){
						$scope.email_typeerror=false;
						error+=true;
					}
					else{
						$scope.email_typeerror=true;
					}*/
				}
			}
			//Password checking
			if($scope.customer_password=='' || $scope.customer_password==undefined )
			{
				$scope.password_emptyerror=false;
			}
			else{
				$scope.password_emptyerror=true;
				if($scope.customer_password.length>8){
					$scope.password_sizeerror=false;
				}
				else{
					$scope.password_sizeerror=true;
				}
				
			}
			//State checking
			if($scope.customer_state=='' || $scope.customer_state==undefined)
			{
				$scope.state_emptyerror=false;
			}
			else{
				$scope.state_emptyerror=true;
				if($scope.customer_state.length>32){
					$scope.state_sizeerror=false;
					error+=true;
				}
				else{
					$scope.state_sizeerror=true;
					if(!regExpCharacter.test($scope.customer_state)){
						$scope.state_typeerror=false;
						error+=true;
					}
					else{
						$scope.state_typeerror=true;
						var states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District Of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
						var findStatus="fail";
						try{
							for (var index = 0; index < states.length; index++) { 
							    if($scope.customer_state==states[index]){
							    	findStatus="success";
							    	break;
							    }
							}
							if(findStatus=="success"){
						    	$scope.state_invaliderror=true;
							}
							else{
						    	throw new malformed_state_exception();
						    }
						}
						catch(exception){
							if(exception instanceof malformed_state_exception){
								$scope.state_invaliderror=false;
								error+=true;
							}
						}
					}
				}
			}
			if(error==""){
			var customer_data=[]; 
			customer_data.push($scope.customer_firstname);
			customer_data.push($scope.customer_lastname);
			customer_data.push($scope.customer_address);
			customer_data.push($scope.customer_city);
			customer_data.push($scope.customer_state);
			customer_data.push($scope.customer_zip_1);
			customer_data.push($scope.customer_zip_2);
			customer_data.push($scope.customer_phone_number);
			customer_data.push($scope.customer_email);
			$http({
				method : "POST",
				url : '/updateDriverProfile',
				data : {
					"data" : customer_data
				}
				}).success(function(result) {
					if(result){
						alert(result);
					}
				}).error(function(error) {
					alert("Unknown error.Please try again later");
			});
		}
		else
			return false;
		}
		$http({
			method : "GET",
			url : '/getDriverProfile',
			}).then(function(response) {
			  	var data = response.data;
				$scope.customer_firstname=data.firstName;
				$scope.customer_lastname=data.lastName;
				$scope.customer_address=data.address;
				$scope.customer_city=data.city;
				$scope.customer_zip_1=data.zipcode_primary;
				$scope.customer_zip_2=data.zipcode_secondary;
				$scope.customer_email=data.email;
				$scope.customer_phone_number=data.phone;
				$scope.customer_state=data.state;
				
			  }, function() {
			    
		});
  $scope.authenticate=function(credentials){
    
    $http.post("/driverSignIn",credentials).success(function(data){
    	
    	if(data.statusCode == 401)
    	{
    		$scope.errorDialog = true;
    		$scope.errorMessage = data.message;
    	}
    	else
    		{
    			window.location.assign('home');
    		}
      
    }).error(function(data){
      $scope.errorMessage = "Unexpected Error";
    }); 
 
  }; 
});

uberApp.controller('driversignUp', function($scope, $http) 
		{
			console.log('In driver sign up controller');
			//disable all errors by default
			//ssn
			$scope.ssn_typeerror=true;
			$scope.ssn_emptyerror=true;
			$scope.ssn_sizeerror=true;
			//first name
			$scope.fname_typeerror=true;
			$scope.fname_sizeerror=true;
			$scope.fname_emptyerror=true;
			//last name
			$scope.lname_typeerror=true;
			$scope.lname_sizeerror=true;
			$scope.lname_emptyerror=true;
			//address
			$scope.address_sizeerror=true;
			$scope.address_emptyerror=true;
			//city
			$scope.city_typeerror=true;
			$scope.city_sizeerror=true;
			$scope.city_emptyerror=true;
			//state
			$scope.state_typeerror=true;
			$scope.state_sizeerror=true;
			$scope.state_emptyerror=true;
			//zip code
			$scope.zip_typeerror=true;
			$scope.zip_sizeerror=true;
			$scope.zip_emptyerror=true;
			$scope.zip2_sizeerror=true;
			//Phone
			$scope.phone_typeerror=true;
			$scope.phone_sizeerror=true;
			$scope.phone_emptyerror=true;
			//Phone
			$scope.email_typeerror=true;
			$scope.email_sizeerror=true;
			$scope.email_emptyerror=true;
			
			//password
			$scope.password_sizeerror=true;
			$scope.password_emptyerror=true;
			
			//car brand error
			$scope.carbrand_emptyerror=true;
			
			//car number error
			$scope.carnumber_emptyerror=true;
			
			
			
			$scope.signup=function(){

				
				$scope.ssn_typeerror=true;
				$scope.ssn_emptyerror=true;
				$scope.ssn_sizeerror=true;
				//first name
				$scope.fname_typeerror=true;
				$scope.fname_sizeerror=true;
				$scope.fname_emptyerror=true;
				//last name
				$scope.lname_typeerror=true;
				$scope.lname_sizeerror=true;
				$scope.lname_emptyerror=true;
				//address
				$scope.address_sizeerror=true;
				$scope.address_emptyerror=true;
				//city
				$scope.city_typeerror=true;
				$scope.city_sizeerror=true;
				$scope.city_emptyerror=true;
				//state
				$scope.state_typeerror=true;
				$scope.state_sizeerror=true;
				$scope.state_emptyerror=true;
				//zip code
				$scope.zip_typeerror=true;
				$scope.zip_sizeerror=true;
				$scope.zip_emptyerror=true;
				$scope.zip2_sizeerror=true;
				//Phone
				$scope.phone_typeerror=true;
				$scope.phone_sizeerror=true;
				$scope.phone_emptyerror=true;
				//Phone
				$scope.email_typeerror=true;
				$scope.email_sizeerror=true;
				$scope.email_emptyerror=true;
				
				//password
				$scope.password_sizeerror=true;
				$scope.password_emptyerror=true;
				
				//car brand error
				$scope.carbrand_emptyerror=true;
				
				//car number error
				$scope.carnumber_emptyerror=true;
			
		   //Validation checking
			var error="";
				var regExpNumber=/^[0-9]*$/;
				var regExpCharacter=/^[a-z A-Z]*$/;
				
				if($scope.driver_id_1=='' || $scope.driver_id_1==undefined || $scope.driver_id_2=='' || $scope.driver_id_2==undefined || $scope.driver_id_3=='' || $scope.driver_id_3==undefined)
				{
					$scope.ssn_emptyerror=false;
					error+=true;
				}
				else
				{
					$scope.ssn_emptyerror=true;
					//checking for length
		            if($scope.driver_id_1.length!=3 || $scope.driver_id_2.length!=2 || $scope.driver_id_3.length!=4){
						$scope.ssn_sizeerror=false;
						error=true;
					}
					else
					{
						$scope.ssn_sizeerror=true;
						//checking for illegal characters
		                      if(!regExpNumber.test($scope.driver_id_1) || !regExpNumber.test($scope.driver_id_2) || !regExpNumber.test($scope.driver_id_3)){
							$scope.ssn_typeerror=false;
							error+=true;
						}
						else{
							$scope.ssn_typeerror=true;
						}
					}
				}
				//first name checking	Checking for empty field.
				if($scope.fname=='' || $scope.fname==undefined)
				{
					$scope.fname_emptyerror=false;
				}
				else{
					$scope.fname_emptyerror=true;
					//checking for length in lastname
					if($scope.fname.length>24){
						$scope.fname_sizeerror=false;
						error=true;
					}
					else{
						$scope.fname_sizeerror=true;
						//checking illegal characters in last name 
						if(!regExpCharacter.test($scope.fname)){
							$scope.fname_typeerror=false;
							error=true;
						}
						else{
							$scope.fname_typeerror=true;
						}
					}
				}
				//last name checking
				if($scope.lname=='' || $scope.lname==undefined)
				{
					$scope.lname_emptyerror=false;
				}
				else{
					$scope.lname_emptyerror=true;
					//checking for length in lastname
					if($scope.lname.length>24){
						$scope.lname_sizeerror=false;
						error=true;
					}
					else{
						$scope.lname_sizeerror=true;
						//checking illegal characters in last name 
						if(!regExpCharacter.test($scope.lname)){
							$scope.lname_typeerror=false;
							error=true;
						}
						else{
							$scope.lname_typeerror=true;
						}
					}
				}
				//Address checking
				if($scope.address=='' || $scope.address==undefined)
				{
					$scope.address_emptyerror=false;
					error=true;
				}
				else{
					$scope.address_emptyerror=true;
					//checking address length
					if($scope.address.length>128){
						$scope.address_sizeerror=false;
						error=true;
					}
					else{
						$scope.address_sizeerror=true;
					}
				}

				//State checking
				if($scope.city=='' || $scope.city==undefined)
				{
					$scope.city_emptyerror=false;
					error=true;
				}
				else{
					$scope.city_emptyerror=true;
					if($scope.city.length>32){
						$scope.city_sizeerror=false;
						error=true;
					}
					else{
						$scope.city_sizeerror=true;
						if(!regExpCharacter.test($scope.city)){
							$scope.city_typeerror=false;
							error=true;
						}
						else{
							$scope.city_typeerror=true;
						}
					}
				}
				//State checking
				if($scope.state=='' || $scope.state==undefined)
				{
					$scope.state_emptyerror=false;
				}
				else{
					$scope.state_emptyerror=true;
					if($scope.state.length>32){
						$scope.state_sizeerror=false;
						error+=true;
					}
					else{
						$scope.state_sizeerror=true;
						if(!regExpCharacter.test($scope.state)){
							$scope.state_typeerror=false;
							error+=true;
						}
						else{
							$scope.state_typeerror=true;
						}
					}
				}
				//zip code checking
				if($scope.driver_zip_1=='' || $scope.driver_zip_1==undefined)
				{
					$scope.zip_emptyerror=false;
					error=true;
				}
				else{
					$scope.zip_emptyerror=true;
					if($scope.driver_zip_1.length!=5){
						$scope.zip_sizeerror=false;
						error=true;
					}
					else{
						$scope.zip_sizeerror=true;
						if(!regExpNumber.test($scope.driver_zip_1)){
							$scope.zip_typeerror=false;
							error=true;
						}
						else{
							$scope.zip_typeerror=true;
						}
					}
				}
				
				if($scope.driver_zip_2!='' && $scope.driver_zip_2!=undefined){
					if($scope.driver_zip_2.length!=4){
						$scope.zip2_sizeerror=false;
						error=true;
					}
					else{
						$scope.zip2_sizeerror=true;
					}
				}
				//Phone number checking
				if($scope.driver_phone_code=='' || $scope.driver_phone_code==undefined || $scope.driver_phone_number=='' || $scope.driver_phone_number==undefined )
				{
					$scope.phone_emptyerror=false;
					error=true;
				}
				else{
					$scope.phone_emptyerror=true;
					if($scope.driver_phone_number.length!=7){
						$scope.phone_sizeerror=false;
						error=true;
					}
					else{
						$scope.phone_sizeerror=true;
						if(!regExpNumber.test($scope.driver_phone_number)){
							$scope.phone_typeerror=false;
							error=true;
						}
						else{
							$scope.phone_typeerror=true;
						}
					}
				}

				//Email ID checking
				if($scope.email=='' || $scope.email==undefined)
				{
					$scope.email_emptyerror=false;
					error=true;
				}
				else{
					$scope.email_emptyerror=true;
					if($scope.email.length>32){
						$scope.email_sizeerror=false;
						error=true;
					}
					else{
						$scope.email_sizeerror=true;
						/*if(!regExpNumber.test($scope.customer_email)){
							$scope.email_typeerror=false;
							error+=true;
						}
						else{
							$scope.email_typeerror=true;
						}*/
					}
				}
				//Password checking
				if($scope.password=='' || $scope.password==undefined )
				{
					$scope.password_emptyerror=false;
				}
				else{
					$scope.password_emptyerror=true;
					if($scope.password.length>8){
						$scope.password_sizeerror=false;
						error=true;
					}
					else{
						$scope.password_sizeerror=true;
						
					}
					
				}
				//car brand checking
				if($scope.carbrand==''|| $scope.carbrand==undefined)
				{
		         $scope.carbrand_emptyerror=false;
		         error=true;    

				}
				
				 //car number checking          
				
		        		if($scope.carnumber==''|| $scope.carnumber==undefined)
		        		{
		                 $scope.carnumber_emptyerror=false;
		                 error=true;    

		        		}
		        console.log(error);		



				if(error=="")
				{
				//console.log('I am here after validation');
				//	console.log($scope.vid);
			  ssn=Number($scope.driver_id_1+$scope.driver_id_2+$scope.driver_id_3);
			//	console.log('new 1 is '+ssn);

				    //  console.log(video); 
			 var video;
			  driver_data=[];
		       driver_data.push(ssn);
		       driver_data.push($scope.fname);
		       driver_data.push($scope.lname);
		       driver_data.push($scope.password);
		       driver_data.push($scope.email);
		       
		       phone=Number($scope.driver_phone_code+$scope.driver_phone_number)
		       driver_data.push(phone);
		       driver_data.push($scope.driver_zip_1);
		       driver_data.push($scope.driver_zip_2);
		       driver_data.push($scope.address);
		       driver_data.push($scope.city);
		       driver_data.push($scope.state);
		       driver_data.push($scope.carbrand);
		       driver_data.push($scope.carnumber);
		       //driver_data.push(video);
		       var f = document.getElementById('file').files[0],
			      r = new FileReader();
		       console.log(f);
				var  video;
			  r.onloadend = function(e){
			   video = e.target.result;
			  // driver_data.push(video)
			   
			    //send you binary data via $http or $resource or do anything else with it
			    //console.log(data);
			   driver_data.push(video);
			   console.log(driver_data);
				$http({
					method : "POST",
					url : '/driverSignUp',
					data : {
						"data" : driver_data
					}
					}).success(function(result) 
							{
						//console.log(result);
					if(result.message == "success")
						//window.location = '/homepage';
						alert("success");
					else if(result.message === "exist")
					{
						
							alert("User already Exist");
						
					}
					}).error(function(error) {
						alert("Unknown error.Please try again later");
					});
			  }
			 r.readAsBinaryString(f);

			  
			  //driver_data.push(video);

			  //console.log(driver_data);
		      


				}
				else
					return false;
			
		}
			
		});

