var location1 = Math.floor(Math.random() * 5);
var location2 = location1 + 1;
var location3 = location2 + 1;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (isSunk == false) {
    guess = prompt("Ready, aim, fire! (enter a number from 0-6):");
    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
    } else {
        guesses = guesses + 1;

        if (guess == location1 || guess == location2 || guess == location3) {
            alert("HIT!");
            hits = hits + 1;
            if (hits == 3) {
                isSunk = true;
                alert("You sank my battleship!");
            }
        } else {
           alert("MISS");
        }
    }
}
var stats = "You took " + guesses + " guesses to sink the battleship, " +
               "which means your shooting accuracy was " + (3/guesses);
alert(stats);

var model = {
    boardSize : 7,
    numShips : 3,
    shipsSunk: 0,
    shipLength: 3,
    ships : [   {locations: ["06","16","26"], hits: ["","",""]},
                {locations: ["24","34","44"], hits: ["","",""]},
                {locations: ["10","11","12"], hits: ["","",""]}       
            ],
    
    fire: function(guess) {
        for (var i=0;i < this.numships;i++) {
            var ship = this.ships[i];
            locations = ship.locations;
            index = locations.indexOf(guess);
            if(index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if(this.isSunk(ship)) {
                    view.displayMessage("You SANK my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },
    
    isSunk: function(ship) {
        for(var iterCount = 0;iterCount < this.shipLength;iterCount++) {
            if(ship.hits[iterCount] !== "hit") {
                return false;
            }
        }
        return true;
    }
};

model.fire("53");

model.fire("06");
model.fire("16");
model.fire("26");

model.fire("34");
model.fire("24");
model.fire("44");

model.fire("12");
model.fire("11");
model.fire("10");

