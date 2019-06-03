

Vue.component('team-member', {
        template: '#team-member-template',
        props: {
            person : Object,
            filter : Object
        },
        data() {
            return {
                currency : '$'
            }
        },
        computed: {
            activeClass() {
                    return this.person.isActive ? 'active' : 'inactive';
            },
            balanceClass() {
                    let balanceLevel = 'success';
                    if(this.person.balance < 2000) {
                        balanceLevel = 'error';
                    } 
                    else if (this.person.balance < 3000) {
                        balanceLevel = 'warning';
                    }
                    let increasing = false,
                    balance = this.person.balance / 1000;
                    if(Math.round(balance) == Math.ceil(balance)) {
                        increasing = 'increasing';
                    }
                    return [balanceLevel, increasing];
            },
                /**
                * Fields
                */
            balance() {
                   return this.currency + this.person.balance.toFixed(2);
            },
            dateRegistered() {
                   let registered = new Date(this.registered);
                   return registered.toLocaleString('en-US');
            },
            status() {
                   return output = (this.person.isActive) ? 'Active' : 'Inactive';
            }
        },
        methods : {
                filterRow() {
                    let visible = true,
                    field = this.filter.field,
                    query = this.filter.query;
                    if(field) {
                        if(this.filter.field === 'isActive') {
                            visible = (typeof query === 'boolean') ?
                            (query === this.person.isActive) : true;
                        } 
                        else {
                            query = String(query),
                            field = this.person[field];
                            if(typeof field === 'number') {
                                query.replace(this.currency, '');
                                try {
                                    visible = eval(field + query);
                                } 
                                catch(e) {}
                            } 
                            else {
                                field = field.toLowerCase();
                                visible = field.includes(query.toLowerCase());
                            }
                        }
                    }
                    return visible;
                    }
                }
    });

    Vue.component('filtering', {
        template: '#filtering-template',
        props: {
            filter: Object
        },
        methods: {
            isActiveFilterSelected() {
                return (this.filter.field === 'isActive');
            },
            changeFilterField(event) {
                this.filedField = '';
                this.$emit('change-filter-field',event.target.value);
            },
        },
        watch: {
            'filter.query': function() {
                    this.$emit('change-filter-query', this.filter.query)
            }
        }
    });

    Vue.component('breadcrumb', {
        template: '<div></div>'
    })

    Vue.component('dropbox-viewer', {
        template: '#dropbox-viewer-template',
        data() {
            return {
                accessToken: 'bfhgwnai1h68j9g',
                structure : [],
                byteSizes: ['Bytes','KB','MB','GB','TB'],
                isLoading: true
            }
        },
        methods: {
            dropbox() {
                return new Dropbox.Dropbox({
                    accessToken : this.accessToken
                });
            },
            getFolderStructure(path) {
                fetch("https://jsonplaceholder.typicode.com/photos")
                .then(response => response.json())
                .then(json => {
                    this.structure = json;
                    this.isLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
                console.log(this.structure);
            },
            bytesToSize(bytes) {
                let output = '0 Byte';

                if(bytes > 0) {
                    // Divide by 1024 and make an int
                    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                    output = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + this.byteSizes[i];
                }
                return output;
            },
            waitforsometime() {
                setTimeout(function() {;},155000);

            },
            createdFolder() {
                return new Promise((resolve,reject) => {
                    setTimeout(function() {}, 6000);
                    resolve();
                });
            },
            navigate(url) {
                window.open(url,'_blank');
            }
        },
        created() {
            this.getFolderStructure();
        }
    });

    Vue.component('google-viewer', {
        template: '#googledrive-viewer-template',
        data() {
            return {

            }
        }

    });

const app = new Vue({
    el : '#app',
    data: {
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
        changeFilter(field) {
            this.filter.query = '';
            this.filter.field = field;
        },
        changeQuery(query) {
            this.filter.query = query;
        }

    }
});