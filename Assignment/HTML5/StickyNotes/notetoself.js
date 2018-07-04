"use strict";

window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;

    var stickiesArray = getStickiesArray();

    for(var count = 0;count < stickiesArray.length;count++) {
        var key = stickiesArray[count];
        var value = localStorage[key];
        addStickyToDOM(value);
    }
}

function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var sticky = document.createElement("li");
    var span = document.createElement("span");
    
    span.setAttribute("class","sticky");
    span.innerHTML = value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
}

function createSticky() {
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var key = "sticky_" + currentDate.getTime();
    var value = document.getElementById("note_text").value;
    localStorage.setItem(key, value);
    stickiesArray.push(key);
    localStorage.setItem("stickiesArray",JSON.stringify(stickiesArray));
    addStickyToDOM(value);
}

function getStickiesArray() {
    var stickiesArray = localStorage.getItem("stickiesArray");
    if(!stickiesArray) {
        stickiesArray = [];
        localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
    }
    else {
        stickiesArray = JSON.parse(stickiesArray);
    }
    
    return stickiesArray;
}


function deleteSticky(key) {
    localStorage.removeItem(key);
    var stickiesArray = getStickiesArray();
    if(stickiesArray) {
        for(var count = 0;count < stickiesArray.length;count++) {
            if(key == stickiesArray[count]) {
                stickiesArray.splice(count,1);
            }
        }
        localStorage.setItem("stickiesArray",stickiesArray);
    }
}
