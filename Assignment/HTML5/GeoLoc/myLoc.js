'use strict';

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

var map;

window.onload = getMyLocation;

function getMyLocation()
{
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    }
    else {
        alert("Sorry, so far no Geolocation support found!");
    }
}

function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById("location");
    
    div.innerHTML = "You are latitude: " + latitude + ", Longtitude: " + longitude;
    
    var km = computeDistance(position.coords,ourCoords);
    
    var distance = document.getElementById("distance");
    distance.innerHTML = "you are " +  km + " from wickedly smart office";
    
    showMap(position.coords);
}

function displayError(error) {
    var errorTypes = {
        0: "Unknown Error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    
    var errorMessage = errorTypes[error.code];
    if(error.code === 0 || error.code === 2) {
        errorMessage = errorMessage + "  " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
    Math.cos(startLatRads) * Math.cos(destLatRads) *
    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}

function showMap(coords) {
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
    
    var mapOptions = {
        zoom: 10,
        center: googleLatAndLong,
        mapTypeId: 'roadmap'
    };
    
    var mapDiv = document.getElementById("map");
    map = new google.maps.Map(mapDiv,mapOptions);
    var title = "Location";
    var content = "You are here: " + coords.latitude + ", " + coords.longitude;
    addMarker(map,googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
    var markerOptions = {
        position : latlong,
        map: map,
        title: title,
        clickable: true
    };
    
    var marker = new google.maps.Marker(markerOptions);
    
    var infoWindowOptions = {
        content: content,
        position: latlong
    };
    
    var inforWindow = new google.maps.InfoWindow(infoWindowOptions);
    
    google.maps.event.addListener(marker, "click", function() {
        inforWindow.open(map);
    });
}