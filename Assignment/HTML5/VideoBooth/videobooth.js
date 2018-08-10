'use strict';

var videos = { video1: "video/demovideo1", video2: "video/demovideo2" };

var effectFunction = null;

window.onload = function() {
    
    var video = document.getElementById("video");
    video.src = videos["video1"] + getFormatExtension();
    video.load();
    
    
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
    var video = document.getElementById("video");
    
    if (id == "play") {
        pushUnpushButtons("play", ["pause"]);
        if(video.ended) {
            video.load();
        }
        video.play();
    } else if (id == "pause") {
        pushUnpushButtons("pause", ["play"]);
        video.pause();
    } else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
        video.loop = !video.loop;
    } else if (id == "mute") {
        if (isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
        video.muted = !video.muted;
    }
}

function setEffect(e) {
    var id = e.target.getAttribute("id");
    if (id == "normal") {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
    } else if (id == "western") {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
    } else if (id == "noir") {
        pushUnpushButtons("noir", ["normal", "western", "scifi"]);
    } else if (id == "scifi") {
        pushUnpushButtons("scifi", ["normal", "western", "noir"]);
    }
}


function setVideo(e) {
    var id = e.target.getAttribute("id");
    if (id == "video1") {
        pushUnpushButtons("video1", ["video2"]);
    } else if (id == "video2") {
        pushUnpushButtons("video2", ["video1"]);
    }
    video.src = videos[id] + getFormatExtension();
    video.load();
    video.play();
    
    pushUnpushButtons("play",["pause"]);
}

function pushUnpushButtons(idToPush, idArrayToUnpush) {
    if (idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if (!theClass.indexOf("selected") >= 0) {
            theClass = theClass + " selected";
            anchor.setAttribute("class", theClass);
            var newImage = "url(images/" + idToPush + "pressed.png)";
            anchor.style.backgroundImage = newImage;
        }
    }
    for (var i = 0; i < idArrayToUnpush.length; i++) {
        anchor = document.getElementById(idArrayToUnpush[i]);
        theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >= 0) {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}

function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}

function getFormatExtension() {
    var video = document.getElementById("video");
    
    if(video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if(video.canPlayType("video/webm") != "") {
        return ".webm";
    } else if(video.canPlayType("video/ogg") != "") {
        return ".ogv";
    }
}

function endedHandler(e) {
	pushUnpushButtons("", ["play"]);
}

