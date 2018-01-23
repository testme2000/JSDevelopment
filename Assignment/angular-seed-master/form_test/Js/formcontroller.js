'use strict';

(function() {
    angular.module('formApp').controller('formController', function($scope){
        // Add title and header title tag
        $scope.maintag = "Form With AngularJS";
        
        $scope.userchoice = "Hot Tea";
    });
})();