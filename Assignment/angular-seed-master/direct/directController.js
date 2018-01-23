(function(){
    var directApp = angular.module('directApp');
    
    directApp.controller('directController',function($scope) {
        $scope.directStatus = 'I just love it to work with AngularJS';
    });
}());