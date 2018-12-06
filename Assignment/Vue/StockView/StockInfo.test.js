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
        // 2. Table Row tr
        expect(vm.html().includes('tr')).toBe(true);
        // 2. Table Row td
        expect(vm.html().includes('td')).toBe(true);
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
        // Symbol and value
        let name = column.at(0);
        expect(name.text()).toBe("Symbol:");
        let value = column.at(1);
        expect(value.text()).toBe("AAPL");
        // Last Updated and value
        name = column.at(2);
        expect(name.text()).toBe("Last Updated:");
        value = column.at(3);
        expect(value.text()).toBe("2018-12-06 14:04:16");
        // Open and value
        name = column.at(4);
        expect(name.text()).toBe("Open:");
        value = column.at(5);
        expect(value.text()).toBe("171.7600");
        // Close and value
        name = column.at(6);
        expect(name.text()).toBe("Close:");
        value = column.at(7);
        expect(value.text()).toBe("173.7600");
        // High and value
        name = column.at(8);
        expect(name.text()).toBe("High:");
        value = column.at(9);
        expect(value.text()).toBe("174.3400");
        // Low and value
        name = column.at(10);
        expect(name.text()).toBe("Low:");
        value = column.at(11);
        expect(value.text()).toBe("170.4262");
        // Last Dividend
        name = column.at(12);
        expect(name.text()).toBe("Div Amount:");
        value = column.at(13);
        expect(value.text()).toBe("0.0000");
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
        //expect(finalstring).toBe("<tr><td>Last Updated:</td> <td>2018-12-06 14:04:16</td></tr>");
        //<tr><td>Open:</td><td>{{stockObject.Open}}</td><td>Close:</td><td>{{stockObject.Close}}</td></tr>
    });
});