'use strict';

(function(){
    var weatherApp = angular.module('weatherApp',['ngMessages']);

    
    weatherApp.factory('weatherService',['$http','WEATHER_DETAIL','$log', function($http,WEATHER_DETAIL,$log) {
        return {
            getWeatherDetail : function(city, nation) {
                $log.log("Performing query for " + city);
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
                    $log.log("Got the result , temperture is " +  temp);
                    var description = response.data.weather[0].description;
                    console.log(response);
                    var result = WEATHER_DETAIL.resultMsg + description;
                    result += WEATHER_DETAIL.temperMsg + temp;
                    return result;
                },function(response)  {
                    return response.statusText;
                }).catch(function(response) {
                    $log.error(response);
                    return response.statusText;
                }).finally(function() {
                    $log.log("This is finally block"); 
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
    
    var weathermocktest = angular.module('weatherCheckMock',[]);
    
    weathermocktest.service('mockweather',['$q',function($q) {
        this.returnVal = '';
        this.verifyWeather = function(city,country) {
            return $q.when(this.returnVal);
        };
    }]);
    
}());