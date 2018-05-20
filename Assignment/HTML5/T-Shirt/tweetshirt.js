'use strict';

window.onload = function() {
    var button = document.getElementById("previewButton");
    
    button.onclick = previewHandler;
};

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    
    if(shape == "squares") {
        for(var squares = 0;squares < 20;squares++) {
            drawSquare(canvas,context);
        }
    }
}

function drawSquare(convas,context) {
    var width = Math.floor(Math.random() * 40);
    
    var xPos = Math.floor(Math.random() *  canvas.width);
    
    var yPos = Math.floor(Math.random() * canvas.height);
    
    context.fillStyle = "lightBlue";
    
    context.fillRect(xPos,yPos, width, width);
        
}