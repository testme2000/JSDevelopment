'use strict';

MainApp.controller('CurrentController', function($scope){
    var currentDate = new Date();
    $scope.currentMsg = currentDate.toDateString(); 
    $scope.currengTimeMsg = currentDate.toTimeString();
});