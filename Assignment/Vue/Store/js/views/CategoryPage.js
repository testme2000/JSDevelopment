const CategoryPage = {
    name: 'CategoryPage',
    template: `<div>
                    <div v-if="specialgroup">
                        <h1>{{ specialgroup.heading }}</h1>
                        <list-products :inventory="category.productDetails"></list-products>
                    </div>
                    <page-not-found v-if="specialgroupNotFound"></page-not-found>
                </div>`,
    components: {
        PageNotFound
    },
    props: {
        slug: String
    },
    data() {
        return {
            specialgroupNotFound : false,
            specialgroupHome: {
                heading: 'Welcome to Store',
                handle: 'home',
                warehouseinventory: [
                    'adjustable-stem',
                    'fizik-saddle-pak',
                    'keda-tube',
                    'colorful-fixie-lima',
                    'oury-grip-set',
                    'pure-fix-pedals-with-cages'
                ]
            }
        }
    },
    computed: {
        ...Vuex.mapGetters([
            'categoryProducts',
            'categoriesExist'
        ]),
        specialgroup() {
            let specialgroup;
            if(this.categoriesExist) {
                let category = this.categoryProducts(this.slug);
                if(category) {
                    this.specialgroupNotFound = true;
                }
                return category;
            }
            return specialgroup;
        },

        specialproduct() {
            if(this.specialgroup) {
                let specialproduct = this.$store.state.warehouseinventory, result = [];
                console.log("special product");
                for(let dealofday of this.specialgroup.warehouseinventory) {
                    result.push(specialproduct[dealofday]);
                }
                return result;
            }
        }
    }
};