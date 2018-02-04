'use strict';

(function(){
    var isolApp = angular.module('isolApp',[]);
    
    isolApp.directive('isolateddir', function() {
        return {
            scope : {},
            restrict: 'AE',
            replace: true,
            template: '<div>Hello World from isolated scope : <strong>{{childstatus}}<strong></div>',
            link: function(scope,elem,attri) {
                scope.childstatus = "From Child";
            }
        };
        
    });
}());