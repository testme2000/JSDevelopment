'use strict';

(function(){
    var app = angular.module('dirApp');
    
    app.controller("dirController",function($scope) {
        $scope.showpannel = false;
        
        $scope.turnonoffVisible = function() {
            $scope.showpannel = !$scope.showpannel;
        }
    });
}());