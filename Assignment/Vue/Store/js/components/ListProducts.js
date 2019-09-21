
Vue.component('list-products', {
    template: 
    `<div v-if="inventory">
        <p v-if="pagelayout.totalpages > 1">
            Page {{ currentPage }} out of {{ pagelayout.totalPages }}
        </p>
        <div v-if="pagelayout.totalInventoryItem > 10">
            Products per page:
            <select v-model="itemperPage">
                <option>10</option>
                <option>20</option>
                <option v-if="pagelayout.totalInventoryItem > 20">30</option>
                <option v-if="pagelayout.totalInventoryItem > 30">40</option>
            </select>
        </div>
        <button :disabled="currentPage == 1" @click="toPage(currentPage - 1)" v-if="pagelayout.totalPages > 1">Previous Page</button>
        <button :disabled="currentPage == pagelayout.totalPages" @click="toPage(currentPage + 1)" v-if="pagelayout.totalPages > 1">Next Page</button>       
        <ol :start="pagelayout.range.fromPage + 1">
            <li v-for="record in finalPageSetup(inventory)" v-if="record">
                <router-link :to="{ name: 'Product', params: { slug: record.handle}}">
                    <img v-if="record.images[0]" :src="record.images[0].source" :alt="record.title" width="100">
                </router-link>
                <h4>
                    <router-link :to="{ name: 'Product', params: { slug: record.handle}}">
                        {{record.title}}
                    </router-link>
                </h4>
                <p>Powered by : {{record.vendor.title}} </p>
                <p>Price {{ itemPrice(record.variationProducts) }}</p>
            </li>
        </ol>  
        <nav v-if="pagelayout.totalPages > pageAccessPoint">
            <ul>
                <li v-for="page in pageLinks">
                    <button @click="toPage(page)">{{ page }}</button>
                </li>
            </ul>
        </nav>
    </div>`,
    data()  {
        return {
            currentPage : 1,
            itemperPage : 10,
            pageAccessPoint : 4
        }
    },
    props : {
        inventory: Array
    },
    watch : {
        '$route'(to) {
            this.currentPage = parseInt(to.query.page) || 1;
        },
        itemperPage() {
            if(this.currentPage > this.pagelayout.totalPages) {
                this.$router.push({
                    query: Object.assign({}, this.$route.query, {
                        page: this.pagelayout.totalPages
                    })
                })
            }
        }
    },
    computed: {
        pagelayout() {
            console.log("Pagelayout initilzation");
            if(this.inventory) {
                let totalcount = this.inventory.length,
                pageFrom = (this.currentPage * this.itemperPage) - this.itemperPage;
                return {
                    totalInventoryItem : totalcount,
                    totalPages : Math.ceil(totalcount/this.itemperPage),
                    range : {
                        fromPage : pageFrom,
                        toPage : pageFrom + this.itemperPage
                    }
                }
            }
        },
        pageLinks() {
            if(this.inventory.length) {
                let backwardArrow = parseInt(this.currentPage) - this.pageAccessPoint;
                let forwardArrow = parseInt(this.currentPage) + this.pageAccessPoint;
                pages = [];

                if(backwardArrow < 1) {
                    backwardArrow = 1;
                }

                if(forwardArrow > this.pagelayout.totalPages) {
                    forwardArrow = this.pagelayout.totalPages;
                }

                for(var count = backwardArrow; count <= forwardArrow; count++) {
                    pages.push(count);
                }
                return pages;
            }
        }
    },
    methods: {
        toPage(page) {
            this.$router.push({
                query: Object.assign({}, this.$route.query, {
                    page
                })
            });
            this.currentPage = page;
        },
        finalPageSetup(list) {
            let filterlist = list.slice(this.pagelayout.range.fromPage,this.pagelayout.range.toPage);
            return filterlist;
        },
        itemPrice(allavailable) {
            let latestcost = [];

            for(let record of allavailable) {
                if(!latestcost.includes(record.price)) {
                    latestcost.push(record.price);
                }
            }
            let price = '$' + Math.min(...latestcost);
            if(latestcost.length > 1) {
                price = 'From: ' + price;
            }
            return price;
        }
    }        
});