////////////////////////////////////////////////////////////////////////////////////////
// Board Size and Number of ship testing
describe('battleApp Board Size/Number Of Ship Testing....', function() { 
    var $log;
    var boardSize;
    // Create battleApp Module
    beforeEach(module('battleApp'));
    // Validate all battleship constant
    it("Validate all constant", inject(function($injector) {
        var boardSize,numofShips,shiplength;
        
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
        // 3. Ship Length
        shiplength = $injector.get('SHIP_LENGTH');
        expect(shiplength).toBe(3);
        expect(typeof shiplength).toBe("number");
        //////////////////////////////////////////////////////////////////////////////////////
        console.log(boardSize);
        console.log(numofShips);
    }));
});
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
// Board Layout testing
describe('battleApp Application Testing', function() {
    var $battleShipController;
    var $battlescope;
    var $battleService;
    var $battleLog;
    var boardSize;
    var numShip;
    var boardStyle,serviceResult;
    
    console.log("battleApp Layout Testing");
    // Create battleApp Module
    beforeEach(module('battleApp'));
    // Inject battleShip Controller
    beforeEach(angular.mock.inject(function(_$controller_, $rootScope,_battleService_,$log,_BOARD_SIZE_,_NUM_SHIPS_) {
        console.log("battleApp Controller injected");                   
        $battlescope = $rootScope.$new();
        var mockService = _battleService_;
        $battleLog = $log;
        boardSize = _BOARD_SIZE_;
        // Hold the controller value
        $battleShipController = _$controller_('battleController',{ $scope: $battlescope,
                                                                   $battleService: mockService,
                                                                   $log: $battleLog,
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
            // Get sample HIT location from service
            var hitLocation = $battleService.getSampleHitLocationForTest();
            console.log("This is hit location: " + hitLocation);
            $battlescope.guessForm = {  guessInput : "",
                                        $dirty: true,
                                        $pristine: true,
                                        $submitted: true
                                     };
            var colPosition = ['A','B','C','D','E','F','G'];
            var selectedPos = colPosition[hitLocation.charAt(0)];
            selectedPos = selectedPos +  hitLocation.charAt(1);
            console.log(selectedPos);
            
            $battlescope.guessForm.guessInput = selectedPos;
            $battlescope.$digest();
            expect($battlescope.guessForm).toBeDefined();
            // Set the selection to HIT Target
            $battlescope.guessForm.guessInput = selectedPos;
            $battlescope.guessForm.$valid = true;
            // Call fire event
            $battlescope.handleFireButton();
            // Validate Controller response
            expect($battlescope.guessForm.$dirty).toEqual(false);
            expect($battlescope.guessForm.$pristine).toEqual(true);
            expect($battlescope.guessForm.$submitted).toEqual(false);
            expect($battlescope.statusMsg).toBe("HIT!");
            expect($battlescope.rowcolumnsetup[hitLocation.charAt(0)][hitLocation.charAt(1)].Status).toBe("HIT");
            // Validate result should be reflected on UI
            boardStyle = $battlescope.getClass(hitLocation.charAt(0),hitLocation.charAt(1));
            expect(boardStyle.background).toBe("url('ship.png') no-repeat center center");
        });
    });

    // Validate battle Service for HIT
    describe("Validate battle Service 1", function() {
        console.log("Now validate battle Service ");
        it('4. Verify battle Service - HIT', function() {
            // Get sample HIT location from service
            var hitLocation = $battleService.getSampleHitLocationForTest();
            var colPosition = ['A','B','C','D','E','F','G'];
            var selectedPos = colPosition[hitLocation.charAt(0)];
            selectedPos = selectedPos +  hitLocation.charAt(1);
            // Validate for HIT
            expect($battleService).toBeDefined();
            // Get total ship sunked so far
            var totalsunk = $battleService.totalShipSunk();
            // Now hit the ship
            serviceResult = $battleService.fire(hitLocation);
            console.log(serviceResult);
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
            serviceResult = $battleService.fire(hitLocation);
            expect(serviceResult).toBeDefined();
            expect(serviceResult.length > 0).toBeTruthy();
            expect(serviceResult.length).toBeGreaterThan(0);
            expect(serviceResult).toContain("Message: Oops, you already hit that location!");
            // Now sunk the battle ship entirely
            var sunkShip = $battleService.getSampleSunkShipForTest();
            console.log(sunkShip);
            $battleService.fire(sunkShip.locations[1]);
            serviceResult = $battleService.fire(sunkShip.locations[2]);
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
            expect(serviceResult).toContain("You missed.");
            // Validate the total hit count
            var countMsg;
            serviceResult.forEach( function(match) { if(match.indexOf("Miss Count:") > -1) countMsg = match; })
            // Validate count msg
            expect(countMsg).toBeDefined();
            // Get its Miss count
            var missCount = parseInt(countMsg.substring("Miss Count:".length));
            console.log(countMsg);
            expect(missCount >= 0).toBeTruthy();
        });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////
