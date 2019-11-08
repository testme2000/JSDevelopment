

var landscape = function() {
    var result = "";

    var flat = function(size) {
        for(var count = 0;count < size; count++) {
            result += "-";
        }
    }

    var mountain = function(size) {
        for(var count = 0;count < size; count++) {
            result += "^";
        }
        result += "\\";
    }

    flat(4);
    mountain(5);
    flat(5);
    mountain(5);
    flat(3);

    return result;
}

console.log(landscape());