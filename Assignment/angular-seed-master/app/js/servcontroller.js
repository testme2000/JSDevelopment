'use strict';

ServApp.controller('ServController', function($scope, $http,$timeout,ServService,ServFactory) {
    $scope.servtitle = 'Service Controller Title';
    ServService.sayGreeting('Mike');
    ServFactory.finalStatus();
    ServFactory.repeatAfterMe();
});