const HomePage = {
    name: 'HomePage',
    template: 
        `<div>
            <list-products :inventory="inventory"></list-products>
        </div>`,
    data() {
        return {
            productsOfMonth : [
                '15mm-combo-wrench',
                '4mm-5mm-6mm-y-wrench',
                'adjustable-stem',
                'colorful-fixie-lima',
                'fizik-saddle-pak',
                'kenda-tube',
                'oury-grip-set',
                'pure-fix-pedals-with-cages'
            ]
        }
    },
    computed: {
        inventory() {
            let totalitem = this.$store.state.warehouseinventory; 
            let finaloutput = [];

            if(Object.keys(totalitem).length) {
                for(let finalcheck in this.productsOfMonth) {
                    finaloutput.push(totalitem[this.productsOfMonth[finalcheck]]);
                }
            }
            console.log(finaloutput);
            return finaloutput;
        }
    }        
};