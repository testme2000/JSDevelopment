"use strict";
// MOMNOAE88JPG3RGL API Key

import Vue from 'vue';



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
                <td>{{stockObject.DividendAmount}}</td>
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
        errorMessage : '',
        stockdetails : []
    },

    created : function() {
        this.LoadStockData();
    },


    methods: {
        GetStockDetails : function() {
            // Search ticker symbol based upon company name
            this.ticker = this.gettickersymbol(this.stockname);
            if(this.ticker.length === 0) 
            {
                this.errorMessage = "Ticker not found, please check the company name"
                this.resultArrived = false;
                this.fetchStatus = true;
                return;
            }
            var basicUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=";
            basicUrl += this.ticker;
            basicUrl += "&apikey=MOMNOAE88JPG3RGL";
            axios.get(basicUrl).then(result => {
                // Make sure that we receive proper result
                if(result.data['Error Message'] !== undefined)
                {
                    this.errorMessage = "Information not found, Please verify ticker symbol";
                    this.resultArrived = false;
                    this.fetchStatus = true;
                }
                else 
                {
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
                }
             }, error => {
                this.errorMessage = "Information not found";
                this.resultArrived = false;
                this.fetchStatus = true;
             });
        },

        gettickersymbol : function(name)
        {
            var foundticker = "";
            let key = name.toLowerCase();

            this.stockdetails.find(function(record){
                if(record.Name === key) {
                    foundticker = record.Symbol;
                    return foundticker;
                }
            })
            return foundticker;
        },

        WatchKeyup : function(event)
        {
            // Check whether user pressed backspace and textbox is cleared
            if(event.key == "Backspace" || event.key == "Delete")
            {
                // Check whether stock name is blank
                if(this.stockname.length === 0)
                {
                    // Disable result arrived
                    this.resultArrived = false;
                    // Clear the error message
                    if(this.errorMessage.length !== 0) 
                    {
                        this.errorMessage = "";
                    }

                }

            }
            else if(event.key == "Enter")
            {
                this.GetStockDetails();
            }
        },

        LoadStockData : function() 
        {
            var basicUrl = "https://api.iextrading.com/1.0/ref-data/symbols";
            axios.get(basicUrl).then(result => {
                // Make sure that we receive proper result
                let smallset = [];
                result.data.filter(function(record) {
                    if(record.type === "cs") {
                        // Convert string to lower case
                        let tempstring = record.name.toLowerCase();
                        // Remove "inc."
                        let properformat = tempstring.replace("inc","").replace(".","").replace("corporation","").replace("incorporation","");
                        // Remove whitespace
                        let finalvalue = properformat.trim();
                        let updatedvalue = {
                            Symbol : record.symbol,
                            Name : finalvalue
                        };
                        smallset.push(updatedvalue);
                        return updatedvalue;
                    }
                });
                this.stockdetails = smallset;
                console.log("Test");
            }, error => {
                this.errorMessage = "Information not found";
                this.resultArrived = false;
                this.fetchStatus = true;
             });
        }
    }

});