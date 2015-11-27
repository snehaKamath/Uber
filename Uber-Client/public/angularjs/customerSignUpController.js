var uber = angular.module('uberApp', []);
uber.controller('signUp', function($scope, $http) {
	//disable all errors by default
	//ssn
	function malformed_state_exception(){
		console.log("Entered State does not exists");
	}
	
	$scope.ssn_typeerror=true;
	$scope.ssn_emptyerror=true;
	$scope.ssn_sizeerror=true;
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
	//state
	$scope.state_typeerror=true;
	$scope.state_sizeerror=true;
	$scope.state_emptyerror=true;
	$scope.state_invaliderror=true;
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
	//credit card expiry
	$scope.credit_expiry_emptyerror=true;
	
	//credit card holder name
	$scope.credit_name_typeerror=true;
	$scope.credit_name_sizeerror=true;
	$scope.credit_name_emptyerror=true;
	
	$scope.submit = function() {
		//ssn
		$scope.ssn_typeerror=true;
		$scope.ssn_emptyerror=true;
		$scope.ssn_sizeerror=true;
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
		//state
		$scope.state_typeerror=true;
		$scope.state_sizeerror=true;
		$scope.state_emptyerror=true;
		$scope.state_invaliderror=true;
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
		//credit card expiry
		$scope.credit_expiry_emptyerror=true;
		
		//credit card holder name
		$scope.credit_name_typeerror=true;
		$scope.credit_name_sizeerror=true;
		$scope.credit_name_emptyerror=true;
		//Validation checking
		var error="";
		var regExpNumber=/^[0-9]*$/;
		var regExpCharacter=/^[a-z A-Z]*$/;
		//SSN Checking
		//checking for empty fields
		if($scope.customer_id_1=='' || $scope.customer_id_1==undefined || $scope.customer_id_2=='' || $scope.customer_id_2==undefined || $scope.customer_id_3=='' || $scope.customer_id_3==undefined)
		{
			$scope.ssn_emptyerror=false;
			error+=true;
		}
		else{
			$scope.ssn_emptyerror=true;
			//checking for length
			if($scope.customer_id_1.length!=3 || $scope.customer_id_2.length!=2 || $scope.customer_id_3.length!=4){
				$scope.ssn_sizeerror=false;
				error+=true;
			}
			else{
				$scope.ssn_sizeerror=true;
				//checking for illegal characters
				if(!regExpNumber.test($scope.customer_id_1) || !regExpNumber.test($scope.customer_id_2) || !regExpNumber.test($scope.customer_id_3)){
					$scope.ssn_typeerror=false;
					error+=true;
				}
				else{
					$scope.ssn_typeerror=true;
				}
			}
		}
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
		//zip code checking
		if($scope.customer_zip_1=='' || $scope.customer_zip_1==undefined)
		{
			$scope.zip_emptyerror=false;
			error+=true;
		}
		else{
			$scope.zip_emptyerror=true;
			if($scope.customer_zip_1.length!=5){
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
			if($scope.customer_zip_2.length!=4){
				$scope.zip2_sizeerror=false;
				error+=true;
			}
			else{
				$scope.zip2_sizeerror=true;
			}
		}
		//Phone number checking
		if($scope.customer_phone_code=='' || $scope.customer_phone_code==undefined || $scope.customer_phone_number=='' || $scope.customer_phone_number==undefined )
		{
			$scope.phone_emptyerror=false;
			error+=true;
		}
		else{
			$scope.phone_emptyerror=true;
			if($scope.customer_phone_number.length!=10){
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
		//Credit card number checking
		if($scope.customer_credit_card_number=='' || $scope.customer_credit_card_number==undefined )
		{
			$scope.credit_number_emptyerror=false;
		}
		else{
			$scope.credit_number_emptyerror=true;
			//checking for credit card length
			if($scope.customer_credit_card_number.length!=16){
				$scope.credit_number_sizeerror=false;
				error=true;
			}
			else{
				$scope.credit_number_sizeerror=true;
				//checking for illegal characters in credit card number
				if(!regExpNumber.test($scope.customer_credit_card_number)){
					$scope.credit_number_typeerror=false;
					error=true;
				}
				else{
					$scope.credit_number_typeerror=true;
				}
			}
		}
		//Credit card type checking
		if($scope.customer_credit_card_type=='' || $scope.customer_credit_card_type==undefined)
		{
			$scope.credit_type_emptyerror=false;
			error+=true;
		}
		else{
			$scope.credit_type_emptyerror=true;
		}
		//Credit card CVV empty checking
		if($scope.customer_cvv_number=='' || $scope.customer_cvv_number==undefined )
		{
			$scope.credit_cvv_emptyerror=false;
		}
		else{
			$scope.credit_cvv_emptyerror=true;
			//Credit card CVV size checking
			if($scope.customer_cvv_number.length!=3){
				$scope.credit_cvv_sizeerror=false;
				error=true;
			}
			else{
				$scope.credit_cvv_sizeerror=true;
				//checking for illegal characters in credit card CVV
				if(!regExpNumber.test($scope.customer_cvv_number)){
					$scope.credit_cvv_typeerror=false;
					error=true;
				}
				else{
					$scope.credit_cvv_typeerror=true;
				}
			}
		}
		//Credit card Expiry checking
		if($scope.customer_month_expiry=='' || $scope.customer_month_expiry==undefined || $scope.customer_year_expiry=='' || $scope.customer_year_expiry==undefined)
		{
			$scope.credit_expiry_emptyerror=false;
			error+=true;
		}
		else{
			$scope.credit_expiry_emptyerror=true;
		}
		
		//Credit card holder name
		if($scope.customer_card_holder_name=='' || $scope.customer_card_holder_name==undefined )
		{
			$scope.credit_name_emptyerror=false;
			error+=true;
		}
		else{
			$scope.credit_name_emptyerror=true;
			if($scope.customer_card_holder_name.length>128){
				$scope.credit_name_sizeerror=false;
				error+=true;
			}
			else{
				$scope.credit_name_sizeerror=true;
				if(!regExpCharacter.test($scope.customer_card_holder_name)){
					$scope.credit_name_typeerror=false;
					error+=true;
				}
				else{
					$scope.credit_name_typeerror=true;
				}
				
			}
		}
		if(error==""){
			var customer_data=[]; 
			customer_data.push($scope.customer_id_1);
			customer_data.push($scope.customer_id_2);
			customer_data.push($scope.customer_id_3);
			customer_data.push($scope.customer_firstname);
			customer_data.push($scope.customer_lastname);
			customer_data.push($scope.customer_address);
			customer_data.push($scope.customer_city);
			customer_data.push($scope.customer_state);
			customer_data.push($scope.customer_zip_1);
			customer_data.push($scope.customer_zip_2);
			customer_data.push($scope.customer_phone_code);
			customer_data.push($scope.customer_phone_number);
			customer_data.push($scope.customer_email);
			customer_data.push($scope.customer_password);
			customer_data.push($scope.customer_credit_card_number);
			customer_data.push($scope.customer_credit_card_type);
			customer_data.push($scope.customer_cvv_number);
			customer_data.push($scope.customer_month_expiry);
			customer_data.push($scope.customer_year_expiry);
			customer_data.push($scope.customer_card_holder_name);
			$http({
				method : "POST",
				url : '/customerSignUp',
				data : {
					"data" : customer_data
				}
				}).success(function(result) {
				if(result.status == "success"){
					alert(result.msg);
				}
				else if(result.status=="fail")
				{
					alert(result.msg);
				}
				}).error(function(error) {
					alert("Unknown error.Please try again later");
			});
		}
		else
			return false;
	};
});