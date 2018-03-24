'use strict';

(function(){
    var sportsApp = angular.module('sportsStore');
    
    sportsApp.controller('sportsController', function($scope) {
        $scope.data = {
            products: [{ name: "Product #1", description: "A Product", category: "Category 1", price: 100},
                       { name: "Product #2", description: "A Product", category: "Category 2", price: 200},
                       { name: "Product #3", description: "A Product", category: "Category 3", price: 300},
                       { name: "Product #4", description: "A Product", category: "Category 4", price: 400},
                       { name: "Product #5", description: "A Product", category: "Category 5", price: 500}]
        };
    });
})();