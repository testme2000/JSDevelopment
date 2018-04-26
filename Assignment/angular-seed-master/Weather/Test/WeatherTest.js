var assert = chai.assert;
var expect = chai.expect;

describe('weatherController', function() {
    // Define variables for controller and service
    var weatherController,weatherService;
    var weatherConstant,weatherScope;
    var browser = this.browser;
    
    
    beforeEach(function() {
        // Load the module, so we can start testing
        module('weatherApp');
        
        // Get the weather Service                          
        inject(function($rootScope, $controller,_weatherService_,_WEATHER_DETAIL_) {
            weatherService = _weatherService_;
            
            // Get Controller
            weatherScope = $rootScope.$new();
            weatherController = $controller('weatherController',{$scope: weatherScope});
            console.log(weatherScope.weatherAppStatus);
            // Get App constant
            weatherConstant = _WEATHER_DETAIL_;
        });
    });
    
    describe('Constructor', function() {
        it('Verify Weather Basic Setup - Type of Constant', function() {
            // Verify Type of all constant
            // 1. Url
            assert.typeOf(weatherConstant.url,'string');
            // 2. appid
            assert.typeOf(weatherConstant.appid,'string');
            // 3. Units
            assert.typeOf(weatherConstant.units,'string');
            // 4. resultMsg
            assert.typeOf(weatherConstant.resultMsg,'string');
            // 5. temperMsg
            assert.typeOf(weatherConstant.temperMsg,'string');
            // 6. ProgressMsg
            assert.typeOf(weatherConstant.progressMsg,'string');
            // 7. ErrorMsg
            assert.typeOf(weatherConstant.errorMsg,'string');
        });
        it('Verify Weather Basic Setup - Value of Constant', function() {
            // Verify Type of all constant
            // 1. Url
            assert.strictEqual(weatherConstant.url,'http://api.openweathermap.org/data/2.5/weather',"Weather URL Passed");
            // 2. appid
            assert.strictEqual(weatherConstant.appid,'380b6e1a89bb1f873c9c073d06f2c95a',"Appid Passed");
            // 3. Units
            assert.strictEqual(weatherConstant.units,'imperial',"Unit Passed");
            // 4. resultMsg
            assert.strictEqual(weatherConstant.resultMsg,"Today weather's condition is ","Result Msg Passed");
            // 5. temperMsg
            assert.strictEqual(weatherConstant.temperMsg,'  with Temperture ',"Temperture Msg Passed");
            // 6. ProgressMsg
            assert.strictEqual(weatherConstant.progressMsg,' Fetching the details.................',"Progress Message Passed");
            // 7. ErrorMsg
            assert.strictEqual(weatherConstant.errorMsg,'Unable to obtain details',"Error Message Passed");
        });
    });
    
    describe('Controller Basic Setup', function() {
       it('Controller Scope', function() {
           // Weather scope is Set
           assert.strictEqual(weatherScope.weatherAppStatus,'WeatherApp (Supported by AngularJS)');
           expect(weatherScope.getWeather).to.be.a('function');
           // Call Weather we particular city and country
           weatherScope.weatherForm.$valid = true;
           weatherScope.getWeather();
           //weatherScope.city = "Coppell";
           //weatherScope.country = "USA";
           //console.log(weatherController);
           //weatherController.getWeather();
           assert.typeOf(weatherScope.weatherAppStatus,'string');
           assert.strictEqual(weatherScope.weatherAppStatus,'WeatherApp (Supported by AngularJS)');
       });
    });
});

