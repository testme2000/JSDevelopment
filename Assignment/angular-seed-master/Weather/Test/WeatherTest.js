

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should;
//var sinon = sinon.spy();



describe('weatherController', function() {
    // Define variables for controller and service
    var weatherController,weatherService;
    var weatherConstant,weatherScope;
    var browser = this.browser;
    var weatherLog;
    
    
    
    beforeEach(function() {
        // Load the module, so we can start testing
        module('weatherApp');
        module('weatherCheckMock');
        
        // Get the weather Service                          
        inject(function($rootScope, $controller,_weatherService_,_$http_,_WEATHER_DETAIL_, $log) {
            weatherService = _weatherService_;
            
            // Get Controller
            weatherScope = $rootScope.$new();
            weatherController = $controller('weatherController',{$scope: weatherScope});
            // Get App constant
            weatherConstant = _WEATHER_DETAIL_;
            // Get Log
            weatherLog = $log;
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
           var spyOnControl = sinon.spy(weatherScope,'getWeather');
           var spyOnLog = sinon.spy(weatherLog,'log');
           var spyOnErrorLog = sinon.spy(weatherLog,'error');
           // Call Weather we particular city and country
           // Setup weather form for BDD
           weatherScope.weatherForm = { city: "Coppell",
                                         country: "USA"};
           weatherScope.weatherForm.$valid = true;
           weatherScope.getWeather();
           // Verify Scope constant
           assert.typeOf(weatherScope.weatherAppStatus,'string');
           assert.strictEqual(weatherScope.weatherAppStatus,'WeatherApp (Supported by AngularJS)');
           // Verify Scope result contant updated by service
           assert.typeOf(weatherScope.weatherStatus,'string');
           assert.strictEqual(weatherScope.weatherStatus,weatherConstant.progressMsg,"Controller Weather Invoke Passed");
           //expect(spyOnControl.callCount).to.equal(1);
           assert(weatherScope.getWeather.calledOnce);
           expect(spyOnControl.callCount).equal(1);
           assert(weatherLog.log.calledTwice);
           expect(spyOnLog.callCount).equal(2);
           expect(weatherLog.error.notcalled);
           expect(spyOnErrorLog.callCount).equal(0);
       });
    });
    
    
    
    describe('Service Basic Testing', function() {
       it('Service should up and running', function() {
           expect(weatherService).to.exist;
       });
    });
    
    describe('verify Wheather', function() {
       it('final validation',inject(function(weatherService,mockweather) {
           mockweather.returnVal = "Today's weather condition is";
           console.log('Test0');
           var spyOnService = sinon.spy(weatherService,'getWeatherDetail');
           weatherService.getWeatherDetail('Coppell','USA')
            .then(function(data) {
              expect(data).equal("Today's weather condition is"); 
               console.log(data);
           });
           console.log('TEst');
           assert(weatherService.getWeatherDetail.calledOnce);
           expect(spyOnService.callCount).equal(1);
           console.log("Tested Spy on weatherService as well");
       })); 
    });
});

