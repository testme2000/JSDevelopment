/*
var battleApp = angular.module('battleApp');

describe('battleApp', function() {
    var boardSize;
    
    console.log("This is testing");
    ///////////////////////////////////////////////////////////////////////////
    // Setup the module
    beforeEach(angular.mock.module('battleApp.constants') {
       // console.log("Inside Mock module");
    //    beforeEach(angular.mock.inject(function(_BOARD_SIZE_){
      //      boardSize = _BORAD_SIZE_;
    //        console.log(boardSize);
      //  }));
    }));
    
    // Inject the constant
    console.log("Setup constant");
    beforeEach(angular.mock.inject(function(_BOARD_SIZE_) {
        console.log("Assignment start");
        boardSize = _BOARD_SIZE_;
        console.log(boardSize);
//      numShips = _num_ships_;
//      console.log(numShips);
    }));
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // Its time to verify the constant
    console.log("Its time to test the constant");
    it('Battleship constant should have some preconfigure value', function() {
        // Board Size
        expect(boardSize).toBe(7);
        // NumShip
        //expect(numShips).toBe(3);
    });
    ////////////////////////////////////////////////////////////////////////////
});
*/

angular.module('battleApp',[]);

describe('battleApp', function() { 
    var $log;
    var boardSize;

    beforeEach(module('battleApp'));
    
    //beforeEach(inject(function(_BOARD_SIZE_){
    //    boardSize = _BOARD_SIZE_;
    //}))
    
    afterEach(inject(function(_BOARD_SIZE) {
        boardSize = _BOARD_SIZE;
    }))
    console.log("TEst");
    console.log(boardSize);
    
});

