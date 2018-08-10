'use strict';

(function(){
    angular.module('app').factory('bookLoggerInterceptor',['$q','$log',bookLoggerInterceptor]);
    
    function bookLoggerInterceptor($q,$log) {
        return {
            request: requestInterceptor,
            response: responseInterceptor
        };
        
        function requestInterceptor(config) {
            $log.debug('HTTP ' + config.method + ' request ' + config.url);
            return config;
        }
        
        function responseInterceptor(response) {
            $log.debug('HTTP ' + response.config.method + ' error code ');
            return $q.reject(response);
        }
    }
}());