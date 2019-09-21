

const ProductPage = {
    name: 'ProductPage',
    template: 
        `<div>
            <div v-if="product">
                <div class="images" v-if="mainimage">
                    <img :src="mainimage.source" alt="mainimage.alt || product.title"/>
                </div>
                <div class="thumbnails" v-if="product.images.length > 1">
                    <template v-for="record in product.images">
                        <img :src="record.source" :alt="record.alt || product.title" width="80" @click="updateImage(record)">
                    </template>
                </div>
                <h1>{{ product.title}} - \${{differenttype.price}}</h1>
                <div class="meta">
                    <span>
                        Manufacturer: <strong>{{product.vendor.title}}</strong>
                    </span>
                    <span v-if="product.type">
                        Category: <strong>{{product.type}}</strong>
                    </span>
                    <span>
                        Quantity : <strong>{{ differenttype.quantity}}</strong>
                    </span>
                </div>
                <div class="variations">
                    <select v-model="differenttype" v-if="product.variationProducts.length > 1">
                        <option v-for="differtype in product.variationProducts" 
                                    :key="differtype.barcode" 
                                    :value="differtype"
                                    v-html="variantTitle(differtype) + ((!differenttype.quantity) ? ' -- Out of stock' : '' )">
                        </option> 
                    </select>
                    <button @click="addtocart()" :disabled="!differenttype.quantity"> {{ (differenttype.quantity) ? 'Add to Cart' : 'Out of Stock' }}</button>
                </div>
                <div v-html="product.body"></div>
            </div>
            <page-not-found v-if="productNotFound"></page-not-found>
        </div>`,
    components: {
        PageNotFound
    },
    data() {
        return {
            slug: this.$route.params.slug,
            productNotFound : false,
            mainimage : false,
            differenttype : false
        }
    },
    computed: {
        product() {
            let product;

            if(Object.keys(this.$store.state.warehouseinventory).length) {
                product = this.$store.state.warehouseinventory[this.slug];
                this.mainimage = (product.images.length) ? product.images[0] : false;
                this.differenttype = product.variationProducts[0];

                if(!product) {
                    this.productNotFound = true;
                }
            }
            return product;
        }
    },
    watch: {
        differenttype(dif) {
            if(dif.hasOwnProperty('image')) {
                this.updateImage(dif.image);
            }
        },
        '$route'(to) {
            this.slug = to.params.slug;
        }

    },
    methods: {
        updateImage(selectedimg) {
            this.mainimage = selectedimg;
        },
        variantTitle(record) {
            let iteratior = record.variant;
            finaltitle = [];

            for(let value in iteratior) {
                finaltitle.push(`<b>${iteratior[value].name}:</b> ${iteratior[value].value}`);
            }
            return finaltitle.join(' / ');
        },
        addtocart() {
            alert(`Another product : ${this.product.title} - ${this.variantTitle(this.differenttype)}`);
        }
    }
};
