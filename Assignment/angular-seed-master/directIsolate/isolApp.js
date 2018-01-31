'use strict';

(function(){
    var isolApp = angular.module('isolApp',[]);
    
    isolApp.directive('isolateddir', function() {
        return {
            scope : true, //{},
            restrict: 'AE',
            replace: true,
            template: '<div>Hello World from isolated scope</div>' 
            //+
              //          "We can't access parent value, lets add our own value" +
                //        "<input type='text' ng-model='childValue' />"  +
                  //      "this is your value {childValue}"
        };
        
    });
}());