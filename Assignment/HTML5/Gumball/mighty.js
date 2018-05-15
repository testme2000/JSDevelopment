'use strict';

window.onload = function() {
    setInterval(pageRefresh,3000);
}

function updateSales(sales) {
    var salesDiv = document.getElementById("sales");
    
    for(var i = 0;i < sales.length;i++) {
        var sale = sales[i];
        var div = document.createElement("div");
        div.setAttribute("class","saleItem");
        div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
        salesDiv.appendChild(div);
    }
}

function pageRefresh() {
    var url = "http://gumball.wickedlysmart.com?callback=updateSales";
    
    var newScriptElement = document.createElement("script");
    
    newScriptElement.setAttribute("src",url);
    newScriptElement.setAttribute("id",jsonp);
    
    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElement
}