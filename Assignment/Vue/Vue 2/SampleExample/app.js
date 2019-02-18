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
        salestax : 16,
        messagehtml: '<h1>Hello!, how are you</h1>',
        imgSource: 'http://via.placeholder.com/350x150',
        isVisible: false,
        otherVisible: true,
        currency: '$',
        people : [
                    {
                    "index": 0,
                    "guid": "87597089-5d2b-4628-9689-7321fb85c635",
                    "isActive": false,
                    "balance": 3249.12,
                    "name": "Herring Snyder",
                    "email": "herringsnyder@comstar.com",
                    "registered": "201502-28T03:32:51"
                    },
                    {
                    "index": 1,
                    "guid": "395ac4cf-db76-4e6d-a7a5-63b17d44d9cf",
                    "isActive": false,
                    "balance": 3694.41,
                    "name": "Mercedes Cook",
                    "email": "mercedescook@comstar.com",
                    "registered": "201802-27T02:25:35"
                    },
                    {
                    "index": 2,
                    "guid": "4048f212-48da-4ea8-a0bc-54d7c9619d6a",
                    "isActive": true,
                    "balance": 1053.99,
                    "name": "Wolf Mcdonald",
                    "email": "wolfmcdonald@comstar.com",
                    "registered": "201605-02T11:23:32"
                    },
                    {
                    "index": 3,
                    "guid": "9c6de6f8-07cf-41cb-891c-c9b5bac5209b",
                    "isActive": false,
                    "balance": 2964.63,
                    "name": "Sherry Boyer",
                    "email": "sherryboyer@comstar.com",
                    "registered": "201612-02T03:44:28"
                    },
                    {
                    "index": 4,
                    "guid": "2228fac0-acee-4816-ae3d-dbda77fe90ff",
                    "isActive": true,
                    "balance": 1690.53,
                    "name": "Vasquez Combs",
                    "email": "vasquezcombs@comstar.com",
                    "registered": "201409-07T12:03:22"
                    }
                ]
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
        },
        activeStatus(person) {
            return (person.isActive) ? 'Active' : 'Inactive';
        },
        formatBalance(amount) {
            return this.currency + amount.toFixed(2);
        }
    }
});