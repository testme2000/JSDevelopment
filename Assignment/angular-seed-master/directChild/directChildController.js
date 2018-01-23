'use strict';

(function(){
    var directChildApp = angular.module('directChildApp');
    
    directChildApp.controller('directChildController', function($scope) {
        $scope.parentScopeStatus = 'This is parent scope';
        
        $scope.add999 = function() {
            $scope.parentScopeStatus += "999";
        }
    });
}());