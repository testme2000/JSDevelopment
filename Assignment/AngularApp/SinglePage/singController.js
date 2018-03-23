'use strict';

(function(){
    var singApp = angular.module('singApp');
    
    singApp.controller('singController',['$scope','$location', function($scope,$location) {
        $scope.isActive = function(viewLocation) {
            return $location.path().indexOf(viewLocation) == 0;
        };
    }])
})();