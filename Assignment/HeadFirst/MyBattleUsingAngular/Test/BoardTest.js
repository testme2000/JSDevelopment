describe('battleApp', function() {
    var boardSize;
    
    console.log("This is testing");
    ///////////////////////////////////////////////////////////////////////////
    // Setup the module
    beforeEach(angular.mock.module('battleApp.constants'));
    
    // Inject the constant
    console.log("Setup constant");
    beforeEach(inject(function(BOARD_SIZE) {
        console.log("Assignment start");
        boardSize = BOARD_SIZE;
        console.log(boardSize);
//      numShips = _num_ships_;
//      console.log(numShips);
    }));
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // Its time to verify the constant
    console.log("Its time to test the constant");
/*    it('Battleship constant should have some preconfigure value', function() {
        // Board Size
        expect(boardSize).toBe(7);
        // NumShip
        //expect(numShips).toBe(3);
    });*/
    ////////////////////////////////////////////////////////////////////////////
});