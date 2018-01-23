'use strict';

PrimeApp.controller('SayController', function($scope,$location, $state) {
    $scope.SayTitle = "Welcome Back";
    console.log("This is say page");
    $scope.NiceToKnow = function() {
        //$location.path('/Nice/'+$scope.nickName + '/'+$scope.firstname);
        $state.go('Nice', {
            nickname : $scope.nickName,
            firstname : $scope.firstname
        });
    }
});

