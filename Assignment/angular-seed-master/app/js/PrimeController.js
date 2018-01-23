'use strict';

PrimeApp.controller('PrimeController', function($scope){
   $scope.PrimeTitle = "Welcome"; 
}); 

PrimeApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    console.log("PrimeApp State and Url Provider");
    $stateProvider.state('Say', {
        url : 'Say',
        controller: 'SayController',
        templateUrl: 'Say.html'
    }).state('Nice', {
        url: '/Nice/:nickName/:firstname',
        controller: 'NiceController',
        resolve : {
            name: function() {
                return ['Yamamoto','Andropant','Dadaji'];
            }
        },
        templateUrl: 'Nice.html'
    });
    //$urlRouterProvider.otherwise('/Say');
    $locationProvider.html5Mode(true);
});


