uberApp = angular.module('uberApp');
uberApp.controller("driverridehistorycontroller",function($scope, $state, $http, $window){
console.log('In driver ride HISTORY controller');
$http.get('/searchBill').success(function(data){
	console.log(data);
});
$scope.numbers = [];
$scope.counter = 0;
$scope.loadMore = function () {
    for (var i = 0; i < 25; i++) {
        $scope.numbers.push(++$scope.counter);
    };
}
//$scope.loadMore();

});