'use strict';

(function(){
    var weatherApp = angular.module('weatherApp',['ngMessages']);

    
    weatherApp.factory('weatherService',['$http','WEATHER_DETAIL', function($http,WEATHER_DETAIL) {
        return {
            getWeatherDetail : function(city, nation) {
                var queryDetail = city + ',' + nation;
                return $http.get(WEATHER_DETAIL.url, {
                    params : {
                        q : queryDetail,
                        units: WEATHER_DETAIL.units,
                        appid: WEATHER_DETAIL.appid
                        
                    }   
                }).then(function(response) {
                    // We got the result
                    var temp = response.data.main.temp;
                    console.log(temp);
                    var description = response.data.weather[0].description;
                    console.log(response);
                    var result = WEATHER_DETAIL.resultMsg + description;
                    result += WEATHER_DETAIL.temperMsg + temp;
                    return result;
                },function(response)  {
                    return response.statusText;
                }).catch(function(response) {
                    console.log(response);
                    return response.statusText;
                }).finally(function() {
                    console.log("This is finally block"); 
                });
            }
        }
    }]);

    weatherApp.constant('WEATHER_DETAIL',{
        url     : 'http://api.openweathermap.org/data/2.5/weather',
        appid   : '380b6e1a89bb1f873c9c073d06f2c95a',
        units   : 'imperial',
        resultMsg : "Today weather's condition is ",
        temperMsg : "  with Temperture ",
        progressMsg : " Fetching the details.................",
        errorMsg : "Unable to obtain details"
    });
    
}());