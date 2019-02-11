const app = new Vue({
    el : '#app',
    data: {
        displayText : "On",
        status : true,
        message : 'Hello Vue! TEst IT',
        price: 18 + 6,
        details: ['one','two','three','chacha'],
        shirtprice : 25,
        hatprice : 10,
        currency: '$',
        salestax : 16
    },
    computed: {
        messageToLower() {
            return this.message.toLowerCase();
        },
        shirtcost() {
            return this.addCurrency(this.calculateSalexTax(this.shirtprice));
        },
        hatcost() {
            return this.addCurrency(this.calculateSalexTax(this.hatprice));
        },
        buttonText() {
            this.displayText = (this.status) ? "On" : "Off";
            return this.displayText;
        }
    },
    methods: {
        calculateSalexTax(price) {
            return parseFloat(Math.round((this.salestax/100) * price) + price).toFixed(2);
        },
        addCurrency(price) {
            return this.currency + price;
        },
        toggleIt() {
            this.Status = !this.Status;
            this.displayText = (this.Status) ? "On" : "Off";
        }
    }
});