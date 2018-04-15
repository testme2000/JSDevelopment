'use strict';

(function(){
    var weatherApp = angular.module('weatherApp');
    
    weatherApp.controller('weatherController',['$scope','weatherService','WEATHER_DETAIL',function($scope,weatherService,WEATHER_DETAIL){
        // Mark the title
        $scope.weatherAppStatus = "WeatherApp (Supported by AngularJS)"; 
        // Now fetch the wether detail for user specified city and country
        $scope.getWeather = function() {
            if($scope.weatherForm.$valid) {
                $scope.weatherStatus = WEATHER_DETAIL.progressMsg;
                weatherService.getWeatherDetail($scope.weatherForm.city,$scope.weatherForm.country)
                    .then(function(data) {
                        $scope.weatherDetail = data;
                    }, function(){
                        $scope.weatherDetail = WEATHER_DETAIL.errorMsg;  
                    });
            }
        }
    }]);
    
}());