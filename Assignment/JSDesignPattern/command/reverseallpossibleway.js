'use strict';

function reverse1(inputval) {
    let output = "";

    for(let count = inputval.length - 1;count >= 0;count--)
    {
        output += inputval[count];
    }

    return output;
}

function reverse2(inputval) {
    let output = inputval.split("").reverse().join("");
    return output;
}

function reverse3(inputval) {
    let result = [...inputval];
    let output = [...inputval].reverse().join("");
    return output;
}

function reverse4(inputval) {
    let result = inputval.split("");
    let output = result.reduce((rev, origin) => origin + rev, '');
    console.log(output);
    return output;
}



var input = "i won";
var result = reverse1(input);
console.log("String : " + input);
console.log("Result : " + result);
input = "i won";
result = reverse2(input);
console.log("String : " + input);
console.log("Result : " + result);
input = "i won";
result = reverse3(input);
console.log("String : " + input);
console.log("Result : " + result);
input = "i won";
result = reverse4(input);
console.log("String : " + input);
console.log("Result : " + result);


