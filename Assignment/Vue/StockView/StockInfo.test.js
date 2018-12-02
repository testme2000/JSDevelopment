import Vue from "vue"
import StockInfo from "./src/StockInfo.vue"

describe("Stockinfo.test.js", () => {
    let stock, vm;

    beforeEach(() => {
        stock = Vue.extend(StockInfo);

        vm = new stock({
            data: {
                stockObject : {
                    Symbol : "AAPL",
                    LastUpdated : "2018-11-30"
                }
            }
        }).$mount();
    });
    console.log(vm);
    it('equals stock to "apple inc"', () => {
        expect(vm.stockObject.Symbol).toEqual("AAPL");
    });

});