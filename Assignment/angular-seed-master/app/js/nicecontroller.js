'use strict';

PrimeApp.controller('NiceController', function($scope,$stateParams, othercamper) {
console.log("This is nice page");
    $scope.nicetitle = "Nice to know you,";
    $scope.nickname = $stateParams.nickName;
    $scope.firstname = $stateParams.firstname; 
    $scope.othercamper = othercamper;
});

