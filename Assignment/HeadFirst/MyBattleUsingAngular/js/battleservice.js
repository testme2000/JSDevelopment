'use strict';

battleApp.service('battleService', function() {
   
        this.generateShipLocations = function() {
            //model.generateShipLocations();
            alert("Generating ship locations");
        }
    
        this.fire = function(guess) {
            model.fire(guess);
            return model.returnResult;
        }
        
        this.totalShipSunk = function() {
            return model.shipsSunk;
        }
        
        this.getAllMessage = function() {
            return model.returnResult;
        }
        
        this.clearAllMessage = function() {
            model.returnResult.clear();
        }
        
        var model = {
            boardSize: 7,
            numShips: 3,
            shipLength: 3,
            shipsSunk: 0,
            returnResult : [],

            // Original hard-coded values for ship locations
            ships: [
                { locations: ["06", "16", "26"], hits: ["", "", ""] },
                { locations: ["24", "34", "44"], hits: ["", "", ""] },
                { locations: ["10", "11", "12"], hits: ["", "", ""] }
            ],
            fire: function(guess){
                this.returnResult = new Array();
                for (var i = 0; i < this.numShips; i++) {
                    var ship = this.ships[i];
                    var index = ship.locations.indexOf(guess);

                    // here's an improvement! Check to see if the ship
                    // has already been hit, message the user, and return true.
                    if (ship.hits[index] === "hit") {
                        this.returnResult.push("Message: Oops, you already hit that location!");
                        return true;
                    } else if (index >= 0) {
                        ship.hits[index] = "hit";
                        var returnMsg = "Hit Count: " + guess;
                        this.returnResult.push(returnMsg);
                        this.returnResult.push("HIT!");

                        if (this.isSunk(ship)) {
                            this.returnResult.push("Message: You sank my battleship!");
                            this.shipsSunk++;
                        }
                        return true;
                    }
                }
                returnMsg = "Miss Count: " + guess;
                this.returnResult.push(returnMsg);
                this.returnResult.push("You missed.");
                return false;
            },

            isSunk: function(ship) {
                for (var i = 0; i < this.shipLength; i++)  {
                    if (ship.hits[i] !== "hit") {
                        return false;
                    }
                }
                return true;
            },

            generateShipLocations: function() {
                var locations;
                for (var i = 0; i < this.numShips; i++) {
                    do {
                        locations = this.generateShip();
                    } while (this.collision(locations));
                    this.ships[i].locations = locations;
                }
                console.log("Ships array: ");
                console.log(this.ships);
            },

            generateShip: function() {
                var direction = Math.floor(Math.random() * 2);
                var row, col;

                if (direction === 1) { // horizontal
                    row = Math.floor(Math.random() * this.boardSize);
                    col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                } else { // vertical
                    row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                    col = Math.floor(Math.random() * this.boardSize);
                }

                var newShipLocations = [];
                for (var i = 0; i < this.shipLength; i++) {
                    if (direction === 1) {
                        newShipLocations.push(row + "" + (col + i));
                    } else {
                        newShipLocations.push((row + i) + "" + col);
                    }
                }
                return newShipLocations;
            },

            collision: function(locations) {
                for (var i = 0; i < this.numShips; i++) {
                    var ship = this.ships[i];
                    for (var j = 0; j < locations.length; j++) {
                        if (ship.locations.indexOf(locations[j]) >= 0) {
                            return true;
                        }
                }
            }
            return false;
        }
    }; 

});