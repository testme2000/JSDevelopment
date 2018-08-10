'use strict';

(function(){
    var sportsApp = angular.module('sportsStore');
    //products
    sportsApp.constant("dataUrl"," http://localhost:5500/products");
    
    sportsApp.controller('sportsController', function($scope,$http, dataUrl) {
        $scope.data = {};
        
        $http({
            method: 'GET',
            url: dataUrl
        })
        .then(function(data) {
            console.log(data);
            $scope.data.products = data.data; 
            console.log("data received");
        }
        ,function(error) {
            $scope.data.error = error; 
        });
    });
})();