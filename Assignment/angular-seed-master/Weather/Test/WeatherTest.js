describe('weatherController', function() {
    // Define variables for controller and service
    var weatherController,weatherService;
    var weatherConstant;
    
    
    beforeEach(function() {
        // Load the module, so we can start testing
        module('weatherApp');
        
        // Get the weather Service
        inject(function($controller,$http,_WEATHER_DETAIL_,_weatherService_) {
            weatherService = _weatherService_;
            
            // Get Controller
            weatherController = $controller('weatherController');
            
            // Get App constant
            weatherConstant = _WEATHER_DETAIL_;
        });
    });
    
    describe('Constructor', function() {
        it('Verify Weather Basic Setup', function() {
            // Verify constant
            assert.typeof(weatherConstant.url,'string');
            console.log("TEst");
        });
    });
    
});