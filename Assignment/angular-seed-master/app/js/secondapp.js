'use strict';

angular.module('mySecondApp', ['mySecondApp.controllers']);

angular.module('mySecondApp').run(function($rootScope) {
    $rootScope.legend = 'Most Famous Financial Books';
    $rootScope.name = 'Very primal scope';
});