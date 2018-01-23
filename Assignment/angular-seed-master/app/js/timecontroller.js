'use strict';

angular.module('TimeApp',[]).controller('TimeController', 
                   function($scope) {
    console.log("This is testing");
    $scope.timemessage = "You got it";
    $scope.HitTheTask = function() {
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.timemessage = "We will start pretty soon after every 4 second";
                console.log("After every 4 second, this will log ");
            });
        }, 4000);
    }
});

