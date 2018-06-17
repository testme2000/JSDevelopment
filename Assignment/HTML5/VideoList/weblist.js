"use strict";

var position = 0;
var playlist;
var video;

window.onload = function() {
    playlist = [
        "video/video/preroll",
        "video/video/areyoupopular",
        "video/video/destinationearth"
    ];
    
    video = document.getElementById("video");
    video.addEventListener("ended", nextVideo,false);
    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();
    alert(video.src);
}

function nextVideo() {
    position++;
    
    if(position >= playlist.length) {
        position = 0;
    }
    
    video.src = playlist[position] + getFormatExtension();
    video.load();
    video.play();
    alert(video.src);
}

function getFormatExtension() {
    if(video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if(video.canPlayType("video/webm") != "") {
        return ".webm";
    } else if(video.canPlayType("video/ogg") != "") {
        return ".ogv";
    }
}