'use strict';

(function(){
    var isolApp = angular.module('isolApp',[]);
    
    isolApp.directive('isolatedscope', function() {
        return {
            scope : {},
            restrict: 'AE',
            replace: true,
            template: '<h3>Hello World from isolated scope</h3>'
        };
    });
}());