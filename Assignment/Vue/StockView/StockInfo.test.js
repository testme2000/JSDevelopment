import { shallowMount, mount } from '@vue/test-utils'
import Vue from "vue"
import stockdetails from "./src/StockInfo.vue"

describe("Stockinfo.test.js", () => {
    let stock, vm;
    let deepwrapper;
    let appleResult = {
        Symbol : 'AAPL',
        LastUpdated : '2018-12-06 14:04:16',
        Open : '171.7600',
        Close : '173.7600',
        High : '174.3400',
        Low : '170.4262',
        DividendAmount : '0.0000'
    }

    vm = shallowMount(stockdetails, {
        propsData : {
            stockObject: appleResult
        }
    });

    deepwrapper = mount(stockdetails, {
        propsData : {
            stockObject: appleResult
        }
    })
    
    // Verify - Apple Inc. is passed to StockInfo component
    it('Verify Stock info "apple inc" mounted ', () => {
        // Check all setting layout of Stockinfo with related to 'Apple Inc'
        // Verify - Tag, Tag Visibility
        // 0. Result Tag
        expect(vm.html().includes("h4")).toBe(true);
        expect(vm.find("h4").text()).toBe("Result :");
        expect(vm.find("h4").isVisible()).toBe(true);
        // 1. Ticker Symbol
        expect(vm.html().includes("AAPL")).toBe(true);
        // 2. Last Updated
        expect(vm.html().includes("2018-12-06 14:04:16")).toBe(true);
        // 3. Open
        expect(vm.html().includes("171.7600")).toBe(true);
        // 4. Close
        expect(vm.html().includes("173.7600")).toBe(true);
        // 5. High
        expect(vm.html().includes("174.3400")).toBe(true);
        // 6. Low
        expect(vm.html().includes("170.4262")).toBe(true);
        // 7. Dividend Amount
        expect(vm.html().includes("0.0000")).toBe(true);
    });
    // Verify - Apple Inc. information is assign to respective field in template
    it('Verify component holding Stock info "apple inc" properly ', () => {
        // Check all setting layout of Stockinfo with related to 'Apple Inc'
        // 1. Ticker Symbol
        expect(vm.props().stockObject.Symbol).toBe('AAPL');
        // 2. Last Updated
        expect(vm.props().stockObject.LastUpdated).toBe("2018-12-06 14:04:16");
        // 3. Open
        expect(vm.props().stockObject.Open).toBe("171.7600");
        // 4. Close
        expect(vm.props().stockObject.Close).toBe("173.7600");
        // 5. High
        expect(vm.props().stockObject.High).toBe("174.3400");
        // 6. Low
        expect(vm.props().stockObject.Low).toBe("170.4262");
        // 7. Dividend Amount
        expect(vm.props().stockObject.DividendAmount).toBe("0.0000");
    });
    // Verify - Basic Template structure to display the component value
    it('Verify template structure  ', () => {
        // Check all setting layout of Stockinfo with related to 'Apple Inc'
        // 1. Table
        expect(vm.html().includes('table')).toBe(true);
        expect(vm.find("table").isVisible()).toBe(true);
        // 2. Table Row tr
        expect(vm.html().includes('tr')).toBe(true);
        expect(vm.find("tr").isVisible()).toBe(true);
        // 2. Table Row td
        expect(vm.html().includes('td')).toBe(true);
        expect(vm.find("td").isVisible()).toBe(true);
    });

    // Verify - Template structure to display the component value
    const table = deepwrapper.findAll('table');
    const row = deepwrapper.findAll('tr');
    const column = deepwrapper.findAll('td');
    it('Verify template structure  ', () => {
        // Check all setting layout of component template
        // 1. Table
        expect(table.length).toEqual(1);
        expect(table.is('table')).toBe(true);
        // 2. Table Row tr
        expect(row.length).toEqual(5);
        expect(row.is('tr')).toBe(true);
        // 3. Table Column td
        expect(column.length).toEqual(14);
        expect(column.is('td')).toBe(true);
    });
    // Verify - Template structure layout
    it('Verify template column layout', () => {
        // Symbol, value and visiblity 
        let name = column.at(0);
        expect(name.text()).toBe("Symbol:");
        expect(name.isVisible()).toBe(true)
        let value = column.at(1);
        expect(value.text()).toBe("AAPL");
        expect(value.isVisible()).toBe(true);
        // Last Updated and value
        name = column.at(2);
        expect(name.text()).toBe("Last Updated:");
        expect(name.isVisible()).toBe(true);
        value = column.at(3);
        expect(value.text()).toBe("2018-12-06 14:04:16");
        expect(value.isVisible()).toBe(true);
        // Open and value
        name = column.at(4);
        expect(name.text()).toBe("Open:");
        expect(name.isVisible()).toBe(true);
        value = column.at(5);
        expect(value.text()).toBe("171.7600");
        expect(value.isVisible()).toBe(true);
        // Close and value
        name = column.at(6);
        expect(name.text()).toBe("Close:");
        expect(name.isVisible()).toBe(true);
        value = column.at(7);
        expect(value.text()).toBe("173.7600");
        expect(value.isVisible()).toBe(true);
        // High and value
        name = column.at(8);
        expect(name.text()).toBe("High:");
        expect(name.isVisible()).toBe(true);
        value = column.at(9);
        expect(value.text()).toBe("174.3400");
        expect(value.isVisible()).toBe(true);
        // Low and value
        name = column.at(10);
        expect(name.text()).toBe("Low:");
        expect(name.isVisible()).toBe(true);
        value = column.at(11);
        expect(value.text()).toBe("170.4262");
        expect(value.isVisible()).toBe(true);
        // Last Dividend
        name = column.at(12);
        expect(name.text()).toBe("Div Amount:");
        expect(name.isVisible()).toBe(true);
        value = column.at(13);
        expect(value.text()).toBe("0.0000");
        expect(value.isVisible()).toBe(true);
   });
    // Verify - Template structure layout
    it('Verify template row layout', () => {
        // Symbol and value
        let name = row.at(0).html();
        let finalstring = name.replace(/[\r\n]+/g,'');
        expect(finalstring).toBe("<tr><td>Symbol:</td> <td>AAPL</td></tr>");
        // Last Updated and value
        name = row.at(1).html();
        finalstring = name.replace(/[\r\n]+/g,'');
        expect(finalstring).toBe("<tr><td>Last Updated:</td> <td>2018-12-06 14:04:16</td></tr>");
        // Open Close  and value
        name = row.at(2).html();
        finalstring = name.replace(/[\r\n]+/g,'');
        expect(finalstring).toBe("<tr><td>Open:</td> <td>171.7600</td> <td>Close:</td> <td>173.7600</td></tr>");
        // High Low  and value
        name = row.at(3).html();
        finalstring = name.replace(/[\r\n]+/g,'');
        expect(finalstring).toBe("<tr><td>High:</td> <td>174.3400</td> <td>Low:</td> <td>170.4262</td></tr>");
        // Last Dividend
        name = row.at(4).html();
        finalstring = name.replace(/[\r\n]+/g,'');
        expect(finalstring).toBe("<tr><td>Div Amount:</td> <td>0.0000</td></tr>");
    });
});



