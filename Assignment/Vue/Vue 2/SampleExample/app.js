Vue.component('my-component', {
    template : '<div><h1>hello Vue</h1></div>'
});

Vue.component('my-heading',{
    template: '<h1>{{text}}</h1>',
    props : ['text']
});

let Child = {
    template : '<h3>This is child of vue</h3>'
}

Vue.component('balance', {
    template : '<div><h4>{{formattedCost}}</h4></div>',
    props : ['cost'],
    data() {
        return {
            currency: '$'
        }
    },
    computed: {
        formattedCost() {
            return this.currency + this.cost.toFixed(2);
        }
    }
});

Vue.component('modal-window', {
    template: `<div class="modal fade">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header"></slot>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <slot></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                        <slot name="buttons">
                            <button type="button" class="btn btnprimary">Save changes</button>
                            <button type="button" class="btn btnsecondary" data-dismiss="modal">Close</button>
                        </slot>    
                    </div>
                </div>
                </div>
                </div>`,

    props: {
        visible: {
        type: Boolean,
        default: false
        }
       }
    });

    Vue.component('team-member', {
        template: '#team-member-template',
        props: {
            person : Object
        }
    });

const app = new Vue({
    el : '#app',
    data: {
        displayText : "On",
        status : true,
        shirtprice : 25,
        hatprice : 10,
        currency: '$',
        salestax : 16,
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
                    "registered": "2015-02-28T03:32:51"
                    },
                    {
                    "index": 1,
                    "guid": "395ac4cf-db76-4e6d-a7a5-63b17d44d9cf",
                    "isActive": false,
                    "balance": 3694.41,
                    "name": "Mercedes Cook",
                    "email": "mercedescook@comstar.com",
                    "registered": "2018-02-27T02:25:35"
                    },
                    {
                    "index": 2,
                    "guid": "4048f212-48da-4ea8-a0bc-54d7c9619d6a",
                    "isActive": true,
                    "balance": 1053.99,
                    "name": "Wolf Mcdonald",
                    "email": "wolfmcdonald@comstar.com",
                    "registered": "2016-05-02T11:23:32"
                    },
                    {
                    "index": 3,
                    "guid": "9c6de6f8-07cf-41cb-891c-c9b5bac5209b",
                    "isActive": false,
                    "balance": 2964.63,
                    "name": "Sherry Boyer",
                    "email": "sherryboyer@comstar.com",
                    "registered": "2016-12-02T03:44:28"
                    },
                    {
                    "index": 4,
                    "guid": "2228fac0-acee-4816-ae3d-dbda77fe90ff",
                    "isActive": true,
                    "balance": 1690.53,
                    "name": "Vasquez Combs",
                    "email": "vasquezcombs@comstar.com",
                    "registered": "2014-09-07T12:03:22"
                    }
                ],
        filter : { 
            field : '',
            query : ''              
        },
        components : {
            'second-component' : Child
        }
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
        format(person, key) {
            let field = person[key];
            output = field.toString().trim();
            switch(key)
            {
                case 'balance':
                    output = this.currency + field.toFixed(2);
                    break;
                case 'registered':
                    let registered = new Date(field);
                    output = registered.toLocaleDateString('en-US');
                    break;
                case 'isActive':
                    output = (person.isActive) ? 'Active' : 'InActive';
                    break;
            }
            return output;
        },
        filterRow(person) {
            let visible = true,
            field = this.filter.field,
            query = this.filter.query;
            if(field) {
                if(this.isActiveFilterSelected())
                {
                    visible = (typeof query === 'boolean') ?
                            (person.isActive === this.filter.query) : true;
                }
                else 
                {
                    field = person[field];
                    if(typeof field === "number")
                    {
                        query = String(query);
                        query.replace(this.currency, '');
                        try {
                            visible = eval(field + query);
                        }
                        catch(e) {}
                    }
                    else {
                        query = String(query);
                        field = String(field).toLowerCase();
                        visible = field.includes(query.toLowerCase());
                    }
                }
            }
            return visible;
        },
        isActiveFilterSelected()
        {
            return (this.filter.field === 'isActive');
        },
        activeClass(person)
        {
            return person.isActive ? 'active' : 'inactive';
        },
        balanceClass(person)
        {
            let balanceLevel = 'success';
            if(person.balance < 2000)
            {
                balanceLevel = 'error';
            }
            else if(person.balance < 3000)
            {
                balanceLevel = 'warning';
            }
            let increasing = false, balance = person.balance / 1000;
            if(Math.round(balance) == Math.ceil(balance))
            {
                increasing = 'increasing';
            }
            return [balanceLevel, increasing];
        },
        changeFilter(event)
        {
            this.filter.query = '',
            this.filter.field = event.target.value;
        },
        isActiveFilterSelected()
        {
            return (this.filter.field === 'isActive') ? true : false;
        }
    }
});