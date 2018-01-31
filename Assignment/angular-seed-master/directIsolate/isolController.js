(function(){
    var isolApp = angular.module('isolApp');
    
    isolApp.controller('isolController',function($scope) {
        $scope.parentStatus = "Parent Status with isolated Scope";
        $scope.parentValue = "Test999";
    });
    
    
}());