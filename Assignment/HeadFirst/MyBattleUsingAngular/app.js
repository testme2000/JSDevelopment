'use strict';

var battleApp = angular.module('battleApp',['ngMessages']);

battleApp.constant('BOARD_SIZE',7);
battleApp.constant('NUM_SHIPS',3);

////////////////////////////////////////////////////////////////////////////////////////
// Board Size and Number of ship testing
describe('battleApp Board Size/Number Of Ship Testing', function() { 
    var $log;
    var boardSize;
    // Create battleApp Module
    beforeEach(module('battleApp'));
    // Validate all battleship constant
    it("Validate all constant", inject(function($injector) {
        var boardSize,numofShips;
        
        ////////////////////////////////////////////////////////////////////////////////////////
        // Validate all constant including its type
        // 1. Board Size
        boardSize = $injector.get('BOARD_SIZE');
        expect(boardSize).toBe(7);
        expect(typeof boardSize).toBe("number");
        // 2. Number of Ships
        numofShips = $injector.get('NUM_SHIPS');
        expect(numofShips).toBe(3);
        expect(typeof numofShips).toBe("number");
        //////////////////////////////////////////////////////////////////////////////////////
        console.log(boardSize);
        console.log(numofShips);
    }));
});
////////////////////////////////////////////////////////////////////////////////////////////


