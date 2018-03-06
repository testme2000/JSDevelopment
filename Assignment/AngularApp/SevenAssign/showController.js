'use strict';

(function(){
    var app = angular.module('showApp');
    
    app.controller('showController', function($scope) {
        $scope.showStatus = true;
        $scope.hideStatus = true;
    });
    
}());