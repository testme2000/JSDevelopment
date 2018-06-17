"use strict";

window.onload = init;

function init() {
            localStorage.setItem("sticky_0","Fry Egg and Break for breakfast");
        localStorage.setItem("sticky_1","Cancel Cable Subscription, Who need it when we have ROKU");

    for(let count = 0;count < localStorage.length;count++) {
        let key = localStorage.key(count);
        if(key.substr(0,6) == "sticky") {
            let value = localStorage.getItem(key);
            addStickyToDOM(value);
        }
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