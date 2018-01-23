'use strict';

// Define Decorator App
var decoApp = angular.module('decoApp',[]);

// Define Decorator Config and Provide decorator
decoApp.config(function($provide) {
    $provide.decorator('$log', function($delegate) {
        $delegate.specialLog = function(message) {
            alert(message);
        }
        return $delegate;
    });
});