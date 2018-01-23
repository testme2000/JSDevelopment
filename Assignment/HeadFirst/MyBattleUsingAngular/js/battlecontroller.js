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
            // Convert valid input to upper case
        	var guess = $scope.guessForm.guessInput.toUpperCase();
            // Process the guess
            processGuess(guess,$scope);
            // Initialize it for next value
            $scope.guessInput = "";
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