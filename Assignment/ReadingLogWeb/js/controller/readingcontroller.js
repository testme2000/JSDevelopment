'use strict';

var app = angular.module('myReadingLogApp');

app.controller('ReadLogController', function readingLog($scope) {
   $scope.slogan1 = "Read and expand your horizon"; 
   $scope.slogan2 = "Empower your mind";
    
    $scope.onNewLog = function() {
        console.log("Test");
        alert("Test");
    } ;
});