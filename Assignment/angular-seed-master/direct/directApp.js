'use strict';

(function(){
    var directApp = angular.module('directApp', []);
    
    directApp.directive('helloDirective', function() {
        return {
            restrict : 'AEC',
            replace: true,
            templateUrl: 'template/hello.html',
            link: function(scope,element,attribute) {
                scope.$watch('directStatus', function(value) {
                   console.log("Status message changed"); 
                });
                
                scope.clearStatusMessage = function()  {
                    scope.directStatus = "";
                }
                
                elem.bind('mouseover', function() {
                   elem.css('cursor', 'pointer'); 
                });
            }
        };    
    });
}());