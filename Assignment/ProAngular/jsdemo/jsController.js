'use strict';

(function(){
    var promApp = angular.module('promApp');
    
    promApp.controller('promController', function($scope,$http) {
        // Use of Javascript Promises
        var jsonprom = $http.get("todo.json");
        jsonprom.then(function(data) {
            $scope.todos = data;
        });
        
    });
    
})();