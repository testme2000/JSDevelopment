'use strict';

battleApp.controller('battleController', function($scope,battleService,BOARD_SIZE,NUM_SHIPS) {
    var guesses = 0;
    $scope.battleTitle = "BattleShip";   
    $scope.statusMsg = "";
    var targetByRow = [[]];
    $scope.toggleHitMiss = "";
    
    $scope.messageStyle = { "position": "absolute",
                            "top": "0px",
                            "left": "0px",	
                            "color": "rgb(83, 175, 19)" } ;
    
    $scope.error_message =  {
            color : "red"
        };
    
    // Setup target Row
    for(var row = 0;row < 7;row++) {
        targetByRow[row] = [7];
        for(var column = 0;column < 7;column++) {
            targetByRow[row][column] = {
                class : "",
                Status : ""
            };
        }
    }
    
    $scope.rowcolumnsetup = targetByRow;
    
    $scope.getClass = function(row,column) {
        var backgroundStyle = "";
        
        if($scope.rowcolumnsetup[row][column].Status === "HIT") {
            backgroundStyle = "url('ship.png') no-repeat center center";
        }
        else if($scope.rowcolumnsetup[row][column].Status === "MISS") {
            backgroundStyle = "url('miss.png') no-repeat center center";
        }
        
        return { "background" : backgroundStyle }
    };
    
    $scope.setClass = function(row,column,status) {
        $scope.rowcolumnsetup[row][column].Status = status;
    }

    $scope.handleFireButton = function() {
        if($scope.guessForm.$valid) {
            console.log("Inside handleFireButton");
            // Convert valid input to upper case
        	var guess = $scope.guessForm.guessInput.toUpperCase();
            console.log(guess);
            // Process the guess
            processGuess(guess,$scope);
            // Initialize it for next value
            $scope.guessInput = "";
            // Reset the form state and clear the validation
            $scope.guessForm.$dirty = false;
            $scope.guessForm.$pristine = true;
            $scope.guessForm.$submitted = false;
        }
    }
    
    function parseGuess(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess === null || guess.length !== 2) {
            alert("Oops, please enter a letter and a number on the board.");
        } else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);

            if (isNaN(row) || isNaN(column)) {
                alert("Oops, that isn't on the board.");
            } else if (row < 0 || row >= BOARD_SIZE ||
                       column < 0 || column >= BOARD_SIZE) {
                alert("Oops, that's off the board!");
            } else {
                return row + column;
            }
        }
        return null;
    }
    
    function processGuess(guess,$scope) {
		var location = parseGuess(guess);
		if (location) {
			guesses++;
			var hit = battleService.fire(location);
			if (hit && battleService.totalShipSunk() === NUM_SHIPS) {            
					$scope.statusMsg = "You sank all my battleships, in " + this.guesses + " guesses";
			}
            else {
                var allMessage = battleService.getAllMessage();
                for(var msg = 0; msg < allMessage.length;msg++) {
                    if(allMessage[msg].indexOf("Message") !== -1) {
                        $scope.statusMsg = allMessage[msg];
                        alert(allMessage[msg]);
                    }
                    else if(allMessage[msg].indexOf("HIT!") !== -1) {
                        var row = Number(location.charAt(0));
                        var column = Number(location.charAt(1));
                        $scope.statusMsg = "HIT!"
                        $scope.setClass(row,column,"HIT");
                    }
                    else if(allMessage[msg].indexOf("Miss") !== -1) {
                        var row = Number(location.charAt(0));
                        var column = Number(location.charAt(1));
                        $scope.statusMsg = "You miss the target";
                        $scope.setClass(row,column,"MISS");
                    }
                }
            }
		}
	}
});


////////////////////////////////////////////////////////////////////////////////////////////
// Board Layout testing
describe('battleApp Application Testing', function() {
    var $battleShipController;
    var $battlescope;
    var $battleService;
    var boardSize;
    var numShip;
    var boardStyle,serviceResult;
    
    console.log("battleApp Layout Testing");
    // Create battleApp Module
    beforeEach(module('battleApp'));
    // Inject battleShip Controller
    beforeEach(angular.mock.inject(function(_$controller_, $rootScope,_battleService_,_BOARD_SIZE_,_NUM_SHIPS_) {
        console.log("battleApp Controller injected");                   
        $battlescope = $rootScope.$new();
        var mockService = _battleService_;
        boardSize = _BOARD_SIZE_;
        // Hold the controller value
        $battleShipController = _$controller_('battleController',{ $scope: $battlescope,
                                                                   $battleService: mockService,
                                                                   boardSize: _BOARD_SIZE_,
                                                                   numShip: _NUM_SHIPS_
                                                                 });
        // Preserve the service for further testing
        $battleService = mockService;
    }));
    // Validate basic layout setup
    describe('Validate board layout', function() {
        console.log("Now validate the basic layout")
        it('1. Verify setup of board', function() {
            // Validate controller has to be defined
            expect($battleShipController).toBeDefined();
            expect($battlescope).toBeDefined();
            // Validate title and status message
            expect($battlescope.battleTitle).toBe('BattleShip');
            expect($battlescope.statusMsg).toBe("");
            // Validate Hit/Miss Status
            expect($battlescope.toggleHitMiss).toBe("");
            // Validate Error message color
            expect($battlescope.error_message.color).toBe("red");
            // Validate Message style layout
            expect($battlescope.messageStyle.position).toBe("absolute");
            expect($battlescope.messageStyle.top).toBe("0px");
            expect($battlescope.messageStyle.left).toBe("0px");
            expect($battlescope.messageStyle.color).toBe("rgb(83, 175, 19)");
            // Validate Board Layout area
            expect($battlescope.rowcolumnsetup.length).toBe(boardSize);
            // Now validate inside board area
            for(var row; row < boardSize;row++) {
                for(var column; column < boardSize;column++) {
                    expect($battlescope.rowcolumnsetup[row][column].column).toBe("");
                    expect($battlescope.rowcolumnsetup[row][column].status).toBe("");
                }
            }
        });
    });
    // Validate battleship functionality
    describe('Validate board class', function() {
        console.log("Now validate battleship class function");
        it('2. Verify board basic functionality', function() {
            // Validate : Board will set HIT property for row & column
            $battlescope.setClass("0","0","HIT");
            expect($battlescope.rowcolumnsetup[0][0].Status).toBe("HIT");
            // Reset it back
            $battlescope.setClass("0","0","");
            expect($battlescope.rowcolumnsetup[0][0].Status).toBe("");
            // Validate : Board will set MISS property for row & column
            $battlescope.setClass("5","5","MISS");
            expect($battlescope.rowcolumnsetup[5][5].Status).toBe("MISS");
            $battlescope.setClass("5","5","");
            expect($battlescope.rowcolumnsetup[0][0].Status).toBe("");
        });
    });
    // Validate battleship user interaction for HIT
    describe('Validate User intacton with board', function() {
        console.log("Now validate user interaction");
        it('3. Verify board response with user selection functionality For HIT', function() {
            $battlescope.guessForm = {  guessInput : "",
                                        $dirty: true,
                                        $pristine: true,
                                        $submitted: true
                                     };
            $battlescope.guessForm.guessInput = "A6";
            $battlescope.$digest();
            expect($battlescope.guessForm).toBeDefined();
            // Set the selection to HIT Target
            $battlescope.guessForm.guessInput = "A6";
            $battlescope.guessForm.$valid = true;
            // Call fire event
            $battlescope.handleFireButton();
            // Validate Controller response
            expect($battlescope.guessForm.$dirty).toEqual(false);
            expect($battlescope.guessForm.$pristine).toEqual(true);
            expect($battlescope.guessForm.$submitted).toEqual(false);
            expect($battlescope.statusMsg).toBe("HIT!");
            expect($battlescope.rowcolumnsetup[0][6].Status).toBe("HIT");
            // Validate result should be reflected on UI
            boardStyle = $battlescope.getClass(0,6);
            expect(boardStyle.background).toBe("url('ship.png') no-repeat center center");
        });
    });
    // Validate battleship user interaction for MISS
    describe('Validate User intacton with board', function() {
        console.log("Now validate user interaction");
        it('3. Verify board response with user selection functionality For MISS', function() {
            $battlescope.guessForm = {  guessInput : "",
                                        $dirty: true,
                                        $pristine: true,
                                        $submitted: true
                                     };
            $battlescope.guessForm.guessInput = "A0";
            $battlescope.$digest();
            expect($battlescope.guessForm).toBeDefined();
            // Set the selection to HIT Target
            $battlescope.guessForm.guessInput = "A0";
            $battlescope.guessForm.$valid = true;
            // Call fire event
            $battlescope.handleFireButton();
            // Validate Controller response
            expect($battlescope.guessForm.$dirty).toEqual(false);
            expect($battlescope.guessForm.$pristine).toEqual(true);
            expect($battlescope.guessForm.$submitted).toEqual(false);
            expect($battlescope.statusMsg).toBe("You miss the target");
            expect($battlescope.rowcolumnsetup[0][0].Status).toBe("MISS");
            // Validate result should be reflected on UI
            boardStyle = $battlescope.getClass(0,0);
            expect(boardStyle.background).toBe("url('miss.png') no-repeat center center");
        });
    });
    // Validate battle Service for HIT
    describe("Validate battle Service 1", function() {
        console.log("Now validate battle Service ");
        it('4. Verify battle Service - HIT', function() {
            // Validate for HIT
            expect($battleService).toBeDefined();
            // Get total ship sunked so far
            var totalsunk = $battleService.totalShipSunk();
            // Now hit the ship
            serviceResult = $battleService.fire("06");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("HIT!");
            // Validate the total hit count
            var countMsg;
            serviceResult.forEach( function(match) { if(match.indexOf("Hit Count:") > -1) countMsg = match; })
            // Validate count msg
            expect(countMsg).toBeDefined();
            // Get its hit count
            var hitCount = parseInt(countMsg.substring("Hit Count:".length));
            expect(hitCount > 0).toBeTruthy();
            // Double hit the ship to avoid being consider
            serviceResult = $battleService.fire("06");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("Message: Oops, you already hit that location!");
            // Now sunk the battle ship entirely
            $battleService.fire("16");
            serviceResult = $battleService.fire("26");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("Message: You sank my battleship!");
            // Validate total ship sunk now
            var updatedSunk = $battleService.totalShipSunk();
            expect(totalsunk < updatedSunk).toBeTruthy();
        });
    });
    // Validate battle Service for MISS
    describe("Validate battle Service 2", function() {
        console.log("Now validate battle Service ");
        it('4. Verify battle Service - MISS', function() {
            // Validate for MISS
            expect($battleService).toBeDefined();
            // Get total ship sunked so far
            var totalsunk = $battleService.totalShipSunk();
            // Now hit the ship
            serviceResult = $battleService.fire("00");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("miss");
            // Validate the total hit count
            var countMsg;
            serviceResult.forEach( function(match) { if(match.indexOf("Miss Count:") > -1) countMsg = match; })
            // Validate count msg
            expect(countMsg).toBeDefined();
            // Get its Miss count
            var hitCount = parseInt(countMsg.substring("Hit Count:".length));
            expect(hitCount > 0).toBeTruthy();
            // Double hit the ship to avoid being consider
            serviceResult = $battleService.fire("06");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("Message: Oops, you already hit that location!");
            // Now sunk the battle ship entirely
            $battleService.fire("16");
            serviceResult = $battleService.fire("26");
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("Message: You sank my battleship!");
            // Validate total ship sunk now
            var updatedSunk = $battleService.totalShipSunk();
            expect(totalsunk < updatedSunk).toBeTruthy();
        });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////
