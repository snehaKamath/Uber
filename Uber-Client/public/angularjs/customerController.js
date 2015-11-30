uberApp = angular.module('uberApp');
uberApp.controller("customerController",function($scope, $http) {
  
	  $scope.authenticate=function(credentials){
    
    $http.post("/customerSignIn",credentials).success(function(data){
    	
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
	//credit card number
	$scope.credit_number_typeerror=true;
	$scope.credit_number_sizeerror=true;
	$scope.credit_number_emptyerror=true;
	//credit card type
	$scope.credit_type_emptyerror=true;
	
	//credit card CVV
	$scope.credit_cvv_typeerror=true;
	$scope.credit_cvv_sizeerror=true;
	$scope.credit_cvv_emptyerror=true;
	//credit card holder name
	$scope.credit_name_typeerror=true;
	$scope.credit_name_sizeerror=true;
	$scope.credit_name_emptyerror=true;
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
		//credit card number
		$scope.credit_number_typeerror=true;
		$scope.credit_number_sizeerror=true;
		$scope.credit_number_emptyerror=true;
		//credit card type
		$scope.credit_type_emptyerror=true;
		
		//credit card CVV
		$scope.credit_cvv_typeerror=true;
		$scope.credit_cvv_sizeerror=true;
		$scope.credit_cvv_emptyerror=true;
		//credit card holder name
		$scope.credit_name_typeerror=true;
		$scope.credit_name_sizeerror=true;
		$scope.credit_name_emptyerror=true;
		
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
			if($scope.customer_zip_2=='')
				$scope.customer_zip_2	=null;
			customer_data.push($scope.customer_zip_2);
			customer_data.push($scope.customer_phone_number);
			customer_data.push($scope.customer_email);
			$http({
				method : "POST",
				url : '/updateCustomerProfile',
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
	url : '/getCustomerProfile',
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
});