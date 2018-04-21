'use strict';

(function(){
    var formApp = angular.module('formApp');
    
    formApp.controller('formController', function($scope) {
        $scope.user = 'John Doe';
        $scope.email = 'john.doe@gmail.com'
    });
}());