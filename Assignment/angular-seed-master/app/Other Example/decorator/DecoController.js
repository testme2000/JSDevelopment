'use strict';

decoApp.controller('DecoController', function($scope,$log) {
    $scope.heading = "Decorator using Angular.js";
    $log.log("TestIt");
    $log.specialLog("This is special");
});