'use strict';

window.onload = function() {
    var button = document.getElementById("previewButton");
    
    button.onclick = previewHandler;
};

function previewHandler() {
    var canvas = document.getElementById("tshirtCanvas");
    var context = canvas.getContext("2d");
    fillBackgroundColor(canvas, context);
    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    
    if(shape == "squares") {
        for(var squares = 0;squares < 20;squares++) {
            drawSquare(canvas,context);
        }
    }
}

function drawSquare(canvas,context) {
    var width = Math.floor(Math.random() * 40);
    
    var xPos = Math.floor(Math.random() *  canvas.width);
    
    var yPos = Math.floor(Math.random() * canvas.height);
    
    context.fillStyle = "lightBlue";
    
    context.fillRect(xPos,yPos, width, width);
        
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    
    var index = selectObj.selectedIndex;
    var bgColor = selectObj.options[index].value;
    
    context.fillStyle = bgColor;
    
    context.fillRect(0,0,canvas.width,canvas.height);
}