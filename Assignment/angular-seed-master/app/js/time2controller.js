'use strict';

angular.module('Time2App',[]).controller('Time2Controller',
                    function($scope,$timeout) {
    $scope.time2message = "This is testing"; 
    $scope.getOnPace = function() {
        $timeout(function() { 
            $scope.time2message = "This is after 4 second";
            console.log("This is from timeout service");
        },4000);
    }
});