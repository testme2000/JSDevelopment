'use strict';

(function() {
    angular.module('validApp').controller('formController',function($scope) {
        $scope.user = {};     
        
        $scope.saveUser = function() {
            if($scope.validateForm.$valid) {
                alert("This user is valid, lets save it");
            }
            else {
                alert("Still need to do more work, this user is not valid");
            }
        }
    });
})();

