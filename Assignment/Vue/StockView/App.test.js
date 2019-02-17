import { shallowMount, mount } from '@vue/test-utils'
import axios from 'axios'
import Vue from "vue"
import stockdetails from "./src/StockInfo.vue"
import app from "./src/App.vue"

jest.mock('axios', () => ({
    get: jest.fn()
}));


describe("Basic App.vue Layout Verification", () => {
    let appwrapper;
    beforeEach(() => {
        axios.get.mockClear();
        axios.get.mockReturnValue(Promise.resolve({}));
       // stockSpyOn = jest.spyOn(app,'LoadStockData');
    });
    const result = { 
        data :  [{
               symbol: "A",
               name: "Agilent Technologies Inc.",
               date: "2018-12-28",
               isEnabled: true,
               type: "cs",
               iexId: "2"
           },
           {
               symbol: "A",
               name: "Agilent Technologies Inc.",
               date: "2018-12-28",
               isEnabled: true,
               type: "cs",
               iexId: "2"
           },
           {
               symbol: "A",
               name: "Agilent Technologies Inc.",
               date: "2018-12-28",
               isEnabled: true,
               type: "cs",
               iexId: "2"
           },
           {
               symbol: "A",
               name: "Agilent Technologies Inc.",
               date: "2018-12-28",
               isEnabled: true,
               type: "cs",
               iexId: "2"
           }
       ]};
    axios.get.mockReturnValue(Promise.resolve(result));


    // Mount app
    appwrapper = mount(app);
    // Verify Main Layout
    it("App layout verification", () => {
        // During Mounting, we loaded all stock data
       // expect(stockSpyOn).toHaveBeenCalled();
        // 0. Division Tag, its attribute
        expect(appwrapper.html().includes("div")).toBe(true);
        expect(appwrapper.attributes().id).toBe("stockapp");
        expect(appwrapper.find("div").isVisible()).toBe(true);
        // 1. All div tag on pages
        // 1a Total div
        let alldiv = appwrapper.findAll("div");
        expect(alldiv.is('div')).toBe(true);
        expect(alldiv.length).toEqual(3);
        // 2. Table tag
        expect(appwrapper.findAll('table').length).toEqual(1);
        expect(appwrapper.html().includes("table")).toBe(true);
        expect(appwrapper.find("table").isVisible()).toBe(true);
        // 3. Table Row
        expect(appwrapper.findAll('tr').length).toEqual(6);
        expect(appwrapper.html().includes('tr')).toBe(true);
        expect(appwrapper.find('tr').isVisible()).toBe(true);   
        // 4. Table Column
        expect(appwrapper.findAll('td').length).toEqual(2);
        expect(appwrapper.html().includes("td")).toBe(true);
        expect(appwrapper.find("td").isVisible()).toBe(true);
        // 5. Span
        expect(appwrapper.findAll('span').length).toEqual(1);
        expect(appwrapper.html().includes("span")).toBe(true);
        expect(appwrapper.find("span").isVisible()).toBe(true);
        expect(appwrapper.find('span').text()).toBe("Please Enter Company Name :");
        // 6. Input
        expect(appwrapper.findAll('input').length).toEqual(1);
        expect(appwrapper.html().includes('input')).toBe(true);
        expect(appwrapper.find("input").isVisible()).toBe(true);
        expect(appwrapper.contains('[placeholder]')).toBe(true);
        expect(appwrapper.contains('[placeholder="e.g Apple Inc."]')).toBe(true);
        const secondwrap = appwrapper.find('[placeholder="e.g Apple Inc."]').html();
        expect(secondwrap).toEqual('<input placeholder="e.g Apple Inc.">');
        // 7. Button
        expect(appwrapper.findAll('button').length).toEqual(1);
        expect(appwrapper.find('button').text()).toBe('Get Details');
        expect(appwrapper.find("button").isVisible()).toBe(true);
    });
});


describe('User input Scenario', () => {
    it('App Mounting verfication',async () => {
        // Given
        const result = { 
             data :  [{
                    symbol: "A",
                    name: "Agilent Technologies Inc.",
                    date: "2018-12-28",
                    isEnabled: true,
                    type: "cs",
                    iexId: "2"
                },
                {
                    symbol: "A",
                    name: "Agilent Technologies Inc.",
                    date: "2018-12-28",
                    isEnabled: true,
                    type: "cs",
                    iexId: "2"
                },
                {
                    symbol: "A",
                    name: "Agilent Technologies Inc.",
                    date: "2018-12-28",
                    isEnabled: true,
                    type: "cs",
                    iexId: "2"
                },
                {
                    symbol: "A",
                    name: "Agilent Technologies Inc.",
                    date: "2018-12-28",
                    isEnabled: true,
                    type: "cs",
                    iexId: "2"
                }
            ]};
        axios.get.mockReturnValue(Promise.resolve(result));
        const appwrapper = mount(app);
        await appwrapper.vm.$nextTick();

        expect(axios.get).toHaveBeenCalledWith('https://api.iextrading.com/1.0/ref-data/symbols');
        expect(appwrapper.vm.stockdetails.length).toBeGreaterThan(0);
        expect(typeof appwrapper.vm.stockdetails).toEqual("object");
        expect(Object.keys(appwrapper.vm.stockdetails[0]).sort()).toEqual(["Name","Symbol"]);    
        // Now validate actual result parsed by webservice return value
        expect(appwrapper.vm.stockdetails[0].Symbol).toEqual("A");
        expect(appwrapper.vm.stockdetails[0].Name).toEqual("agilent technologies");
    });
});

describe('User input Scenario part 2', () => {
    beforeEach(() => {
        axios.get.mockClear();
        axios.get.mockReturnValue(Promise.resolve({}));
    });
    it('Valid Value verfication',async () => {
        // Given
        const result = { 
            data :  [{
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "AAPL",
                name: "Apple Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            }
        ]};
        axios.get.mockReturnValue(Promise.resolve(result));
        const appwrapper = mount(app);
        await appwrapper.vm.$nextTick();


        // Now mock the call with ticker symbol 'AAPL'
        const shareresult = {
            data : {
                "Meta Data": {
                        "1. Information": "Daily Time Series with Splits and Dividend Events",
                        "2. Symbol": "AAPL",
                        "3. Last Refreshed": "2018-12-28",
                        "4. Output Size": "Compact",
                        "5. Time Zone": "US/Eastern"
                    },
                "Time Series (Daily)" : 
                    {
                        "2018-12-28": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        },
                        "2018-12-27": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        },
                        "2018-12-26": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        }
                    }
                }
            };
        // Find stock symbol input button and set the valid company name
        let stockinput = appwrapper.find("input");
        stockinput.setValue("Apple Inc.");
        stockinput.trigger('input');
        // Submit stock symbol value
        let stocksubmit = appwrapper.find("button");
        axios.get.mockReturnValue(Promise.resolve(shareresult));
        stocksubmit.trigger('click');
        await appwrapper.vm.$nextTick();
        // Opeation must be successful
        // Check the internal state
        expect(appwrapper.vm.stockname).toBe("Apple Inc.");
        expect(appwrapper.vm.resultDetails.Symbol).toEqual("AAPL");
        expect(appwrapper.vm.resultDetails.LastUpdated).toEqual("2018-12-28");
        expect(appwrapper.vm.resultDetails.Open).toEqual("157.5000");
        expect(appwrapper.vm.resultDetails.Close).toEqual("156.2300");
        expect(appwrapper.vm.resultDetails.High).toEqual("158.5200");
        expect(appwrapper.vm.resultDetails.Low).toEqual("154.5500");
        expect(appwrapper.vm.resultDetails.DividendAmount).toEqual("0.0000");
        expect(appwrapper.vm.fetchStatus).toBe(true);
        expect(appwrapper.vm.resultArrived).toBe(true);
        expect(appwrapper.vm.ticker.length).toBeGreaterThan(0);
        // Validate the result area
        // 1. Confirmation of result
        let alldiv = appwrapper.findAll('div');
        let resultDiv = alldiv.at(2);
        expect(alldiv.length).toEqual(4);
        expect(resultDiv.isVisible()).toBe(true);
        expect(resultDiv.is('Div')).toBe(true);
        expect(resultDiv.text().includes('We found the details')).toBe(true);
        resultDiv = alldiv.at(3);
        expect(resultDiv.isVisible()).toBe(true);
        expect(resultDiv.is('Div')).toBe(true);
        expect(resultDiv.text().includes('Result :')).toBe(true);
        // 2. Validate actual result 
        const table = appwrapper.findAll('table');
        const row = appwrapper.findAll('tr');
        const column = appwrapper.findAll('td');
        // Check all setting layout of component template
        // 1. Table
        expect(table.length).toEqual(2);
        expect(table.is('table')).toBe(true);
        // 2. Table Row tr
        expect(row.length).toEqual(11);
        expect(row.is('tr')).toBe(true);
        // 3. Table Column td
        expect(column.length).toEqual(16);
        expect(column.is('td')).toBe(true);
        // Symbol, value and visiblity 
        let name = column.at(2);
        expect(name.text()).toBe("Symbol:");
        expect(name.isVisible()).toBe(true)
        let value = column.at(3);
        expect(value.text()).toBe("AAPL");
        expect(value.isVisible()).toBe(true);
        // Last Updated and value
        name = column.at(4);
        expect(name.text()).toBe("Last Updated:");
        expect(name.isVisible()).toBe(true);
        value = column.at(5);
        expect(value.text()).toBe("2018-12-28");
        expect(value.isVisible()).toBe(true);
        // Open and value
        name = column.at(6);
        expect(name.text()).toBe("Open:");
        expect(name.isVisible()).toBe(true);
        value = column.at(7);
        expect(value.text()).toBe("157.5000");
        expect(value.isVisible()).toBe(true);
        // Close and value
        name = column.at(8);
        expect(name.text()).toBe("Close:");
        expect(name.isVisible()).toBe(true);
        value = column.at(9);
        expect(value.text()).toBe("156.2300");
        expect(value.isVisible()).toBe(true);
        // High and value
        name = column.at(10);
        expect(name.text()).toBe("High:");
        expect(name.isVisible()).toBe(true);
        value = column.at(11);
        expect(value.text()).toBe("158.5200");
        expect(value.isVisible()).toBe(true);
        // Low and value
        name = column.at(12);
        expect(name.text()).toBe("Low:");
        expect(name.isVisible()).toBe(true);
        value = column.at(13);
        expect(value.text()).toBe("154.5500");
        expect(value.isVisible()).toBe(true);
        // Last Dividend
        name = column.at(14);
        expect(name.text()).toBe("Div Amount:");
        expect(name.isVisible()).toBe(true);
        value = column.at(15);
        expect(value.text()).toBe("0.0000");
        expect(value.isVisible()).toBe(true);
    });
});


describe('User input Scenario part 3', () => {
    beforeEach(() => {
        axios.get.mockClear();
        axios.get.mockReturnValue(Promise.resolve({}));
    });
    it('Invalid Value verfication',async () => {
        // Given
        const result = { 
            data :  [{
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "AAPL",
                name: "Apple Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            },
            {
                symbol: "A",
                name: "Agilent Technologies Inc.",
                date: "2018-12-28",
                isEnabled: true,
                type: "cs",
                iexId: "2"
            }
        ]};
        axios.get.mockReturnValue(Promise.resolve(result));
        const appwrapper = mount(app);
        await appwrapper.vm.$nextTick();


        // Now mock the call with ticker symbol 'AAPL'
        const shareresult = {
            data : {
                "Meta Data": {
                        "1. Information": "Daily Time Series with Splits and Dividend Events",
                        "2. Symbol": "AAPL",
                        "3. Last Refreshed": "2018-12-28",
                        "4. Output Size": "Compact",
                        "5. Time Zone": "US/Eastern"
                    },
                "Time Series (Daily)" : 
                    {
                        "2018-12-28": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        },
                        "2018-12-27": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        },
                        "2018-12-26": {
                            "1. open": "157.5000",
                            "2. high": "158.5200",
                            "3. low": "154.5500",
                            "4. close": "156.2300",
                            "5. adjusted close": "156.2300",
                            "6. volume": "42291424",
                            "7. dividend amount": "0.0000",
                            "8. split coefficient": "1.0000"
                        }
                    }
                }
            };
        // Find stock symbol input button and set the invalid company name 
        let stockinput = appwrapper.find("input");
        stockinput.setValue("Unknown Inc.");
        stockinput.trigger('input');
        // Submit stock symbol value
        let stocksubmit = appwrapper.find("button");
        axios.get.mockReturnValue(Promise.resolve(shareresult));
        stocksubmit.trigger('click');
        await appwrapper.vm.$nextTick();
        // Opeation must be successful
        // Check the internal state
        // Validate that we receive error message and internal state which
        // indicate invalid data
        expect(appwrapper.vm.stockname).toBe("Unknown Inc.");
        expect(appwrapper.vm.resultArrived).toBe(false);
        expect(appwrapper.vm.fetchStatus).toBe(true);
        expect(appwrapper.vm.errorMessage).toEqual("Ticker not found, please check the company name");
        expect(appwrapper.vm.ticker.length).toEqual(0);
        expect(appwrapper.vm.resultDetails.Symbol).toBeFalsy();
        expect(appwrapper.vm.resultDetails.LastUpdated).toBeFalsy();
        expect(appwrapper.vm.resultDetails.Open).toBeFalsy();
        expect(appwrapper.vm.resultDetails.Close).toBeFalsy();
        expect(appwrapper.vm.resultDetails.High).toBeFalsy();
        expect(appwrapper.vm.resultDetails.Low).toBeFalsy();
        expect(appwrapper.vm.resultDetails.DividendAmount).toBeFalsy();
        // Validate the result area
        // 1. Confirmation of result
        let alldiv = appwrapper.findAll('div');
        let resultDiv = alldiv.at(2);
        expect(alldiv.length).toEqual(3);
        expect(resultDiv.isVisible()).toBe(true);
        expect(resultDiv.is('Div')).toBe(true);
        expect(resultDiv.text().includes('We found the details')).toBe(false);
        resultDiv = alldiv.at(2);
        expect(resultDiv.isVisible()).toBe(true);
        expect(resultDiv.is('Div')).toBe(true);
        expect(resultDiv.text().includes('Ticker not found, please check the company name')).toBe(true);
        // 2. Validate actual result 
        const table = appwrapper.findAll('table');
        const row = appwrapper.findAll('tr');
        const column = appwrapper.findAll('td');
        // Check all setting layout of component template
        // 1. Table
        expect(table.length).toEqual(1);
        expect(table.is('table')).toBe(true);
        // 2. Table Row tr
        expect(row.length).toEqual(6);
        expect(row.is('tr')).toBe(true);
        // 3. Table Column td
        expect(column.length).toEqual(2);
        expect(column.is('td')).toBe(true);
    });
});
