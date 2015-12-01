/**
 * http://usejsdoc.org/
 */
uberApp = angular.module('uberApp');
uberApp.controller("adminSignInController", function($scope, $http, $window, $state) {

  $scope.adminSignIn = function() {
    admin_credentials = {adminEmailid : $scope.adminEmailid,adminPassword : $scope.adminPassword
    };
    $http.post("/adminSignIn", admin_credentials).success(function(data) {
      if (data.statusCode == 401) {
        $scope.errorDialog = true;
        $scope.errorMessage = data.message;
      } else {
        window.location.assign('home');
      }

    }).error(function(data) {
      $scope.errorMessage = "Unexpected Error";
    });
  };

})