"use strict";
// MOMNOAE88JPG3RGL API Key

Vue.component('stock-details',{
    props : ['stock-object'],
    template : '<h4>Result : </h4>'
})
 

var app = new Vue({
    el : '#stockapp',
    data : {
        stockname : "",
        resultArrived : false,
        fetchStatus: false,
        resultDetails: {
            Symbol : '',
            LastUpdated: ''
        }
    },

    methods: {
        GetStockDetails : function() {
            var basicUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
            basicUrl += this.stockname;
            basicUrl += "&apikey=MOMNOAE88JPG3RGL";
            axios.get(basicUrl).then(result => {
                console.log(result); 
                var output = result.data['Meta Data'];
                this.resultDetails.Symbol = output['2. Symbol'];
                this.resultDetails.LastUpdated = output['3. Last Refreshed'];
                this.resultArrived = true;
                this.fetchStatus = true;
             }, error => {
                var error = "Information not found";
                this.resultArrived = false;
                this.fetchStatus = true;
             });
        }
    }

});