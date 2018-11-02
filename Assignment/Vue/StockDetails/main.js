"use strict";
// MOMNOAE88JPG3RGL API Key

Vue.component('stock-details',{
    props : ['stockObject'],
    template : `
        <div>
        <h4>Result :</h4> 
        <table>
            <tr>
                <td>Symbol:</td>
                <td>{{stockObject.Symbol}}</td>
            </tr>
            <tr>
                <td>Last Updated:</td>
                <td>{{stockObject.LastUpdated}}</td>
            </tr>
            <tr>
                <td>Open:</td>
                <td>{{stockObject.Open}}</td>
                <td>Close:</td>
                <td>{{stockObject.Close}}</td>
            </tr>
            <tr>
                <td>High:</td>
                <td>{{stockObject.High}}</td>
                <td>Low:</td>
                <td>{{stockObject.Low}}</td>
            </tr>
            <tr>
                <td>Dividend Amount</td>
                <td>{{stockObject.DividendAmount}}
            </tr>
        </table>
        </div>`
})
 

var app = new Vue({
    el : '#stockapp',
    data : {
        stockname : "",
        resultArrived : false,
        fetchStatus: false,
        resultDetails: {
            Symbol : '',
            LastUpdated: '',
            Open : '',
            Close : '',
            High : '',
            Low : '',
            DividendAmount : 0.0
        },
        companyInfo : [],
        testme : "Check it out"
    },
    computed : {
        ticker : function() {
            // Start searching ticker symbol based upon company name enter so far
            if(this.stockname.length !== 0)
            {
                var filterString = this.stockname.split();
                filterString.reduce
            }
        }
    },
    methods: {
        GetStockDetails : function() {
            // Get the ticker symbol
            this.ticker = SearchTickerSymbol();
            var basicUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
            basicUrl += this.ticker;
            basicUrl += "&apikey=MOMNOAE88JPG3RGL";
            axios.get(basicUrl).then(result => {
                // Get basic stock information
                var output = result.data['Meta Data'];
                this.resultDetails.Symbol = output['2. Symbol'];
                this.resultDetails.LastUpdated = output['3. Last Refreshed'];
                // Stock volume information
                var stocktrans = result.data['Time Series (Daily)'];
                // Split the lastupdate datetime to get only date part 
                let datedetails = this.resultDetails.LastUpdated.split(' ');
                let datepart = datedetails[0];   
                this.resultArrived = true;
                this.fetchStatus = true;
                this.resultDetails.Open = stocktrans[datepart]['1. open'];
                this.resultDetails.Close = stocktrans[datepart]['4. close'];
                this.resultDetails.High = stocktrans[datepart]['2. high'];
                this.resultDetails.Low = stocktrans[datepart]['3. low'];
                this.resultDetails.DividendAmount = stocktrans[datepart]['7. dividend amount'];
             }, error => {
                var error = "Information not found";
                this.resultArrived = false;
                this.fetchStatus = true;
             });
        },
        LoadSetup : function() {
            // Load all symbol details for future search
            var basicUrl = "https://api.iextrading.com/1.0/ref-data/symbols";
            axios.get(basicUrl).then(result => {
                this.companyInfo = result.data.reduce(function(filterData,item) {
                    if(item.type === "cs") {
                        filterData.push({ "Symbol" : item.symbol, "Name" : item.name});
                    }
                    return filterData;
                },[]);
                console.log(this.companyInfo);
            }, error => {
                console.log("Error occur");
            });
        }
    }

});