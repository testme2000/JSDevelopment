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
    it('App should be mounted',async () => {
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
