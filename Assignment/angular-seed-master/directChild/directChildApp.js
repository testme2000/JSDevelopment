'use strict';

(function(){
    var directChildApp = angular.module('directChildApp',[]);
    
    directChildApp.directive('directChild', function(){
        return {
            // Here we are using child scope which inherited from parent
            scope: true,
            restrict: 'AE',
            replace: true,
            template : '<div><h3>This is child scope in directive - AngularJS is super cool</h3>' +
                        '<h4>{{parentScopeStatus}}, Now we are accessing model in child scope</h4>' +
                       '<h4 ng-click="add999()">Now Click to add 999 at the end,so parent get updated</h4></div>'
        };
    });
}());