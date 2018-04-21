'use strict';

(function(){
    var listApp = angular.module('listApp');
    
    listApp.controller('listController', function($scope) {
        $scope.customers = [
            {name:"JB",age:55,gender:'M'},
            {name:'Rajkumar', age:29, gender:'M'},
            {name:'Dadaji', age:55, gender:'M'}
        ];
    });
}());