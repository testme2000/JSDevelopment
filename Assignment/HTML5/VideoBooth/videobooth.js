'use strict';

window.onload = function() {
    var controlLinks = document.querySelectorAll("a.control");
    for(var iControl = 0;iControl < controlLinks.length;iControl++) {
        controlLinks[iControl].onClick = handleControl;
    }
    
    var effectLinks = document.querySelectorAll("a.effect");
    for(var iControl = 0;iControl < effectLinks.length;iControl++) {
        effectLinks[iControl].onClick = setEffect;
    }
    
    var videoLinks = document.querySelectorAll("a.videoSelection");
    for(var iControl = 0;iControl < videoLinks.length;iControl++) {
        videoLinks[iControl].onClick = setVideo;
    }
    
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
}

function handleControl(e) {
    var id = e.target.getAttribute("id");
    
    if (id == "play") {
        pushUnpushButtons("play", ["pause"]);
    } else if (id == "pause") {
        pushUnpushButtons("pause", ["play"]);
    } else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
    } else if (id == "mute") {
        if (isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
    }
}
