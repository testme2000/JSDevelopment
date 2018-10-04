"use strict";

var product = "Socks";

Vue.component('product', {
    props: {
        premium : { 
            type: Boolean,
            required: true
        }
    },
    template : 
    `<div class="product">
        <div class="product-image">
            <img :src="image" />
        </div>
        <div class="product-info">
            <h1>{{caption}}</h1>
            <div v-if="showproductlink">
                <a :href="ProductLink" _target="_blank">More Product like this</a>
            </div>
            <p v-if="inStock">On Sale</p>
            <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
            <p>{{Sale}}</p>
            <p>Shipping : {{shipping}}</p>
            <ul>
                <li v-for="record in Details">{{record}}</li>
            </ul>
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
            </div>
            <div>
                <h4>Size Available</h4>
                <ul>
                    <li v-for="record in Sizes">{{record}}</li>
                </ul>
            </div>
        </div>
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
        <br>
        <span>
            <button v-on:click="removeFromCart">Remove From Cart</button>
        </span>
        <product-tabs :reviews="reviews"></product-tabs>
        
    </div>`,

    data() {
        // Product related data goes here
        return {
            brand: 'MasterGap',
            product : 'Socks',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant : 0,
            ProductLink:'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            showproductlink: true,
            Details: ["80% Cotton","20% Polyster","Gender-neutral"],
            Sizes: ["Small","Medium","Large","Ex-Large"],
            variants: [
                {
                    variantId : 2234,
                    variantColor: "Green",
                    variantImage: "./vmSocks-green-onWhite.jpg",
                    variantQuantity: 5,
                    variantOnSale: false
                },
                {
                    variantId : 2235,
                    variantColor: "Blue",
                    variantImage: "./vmSocks-blue-onWhite.jpg",
                    variantQuantity: 10,
                    variantOnSale: true
                }
            ],
            cart: 0,
            reviews : []
        }
    },

    methods: {
        // Product related methods goes here
        addToCart : function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant.variantId]);
        },
    
        updateProduct : function(index) {
            this.selectedVariant = index;
            console.log("selected variant " +  index);
        },
    
        removeFromCart : function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant.variantId]);
        },

        addReview : function(productReview) {
            this.reviews.push(productReview);
        }
    },

    computed: {
        // Product related computed property goes here
        caption : function() {
            return this.brand + " " + this.product;
        },
    
        image : function() {
            return this.variants[this.selectedVariant].variantImage;
        },
    
        inStock : function() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
    
        Sale : function() {
            if(this.variants[this.selectedVariant].variantOnSale) {
                return "Hurry Big discount " + this.brand + " " + this.product;
            }
            else {
                return "Sale " + this.brand + " " + this.product;
            }
        },
        shipping : function() {
            if(this.premium) {
                return "Shipping is free";
            }
            else {
                return "2.99";
            }
        }
    }
})

Vue.component('product-details', {
    props : {
        details : {
            type: String,
            required: true
        }
    },
    template: `<div>
            <h1>Test</h1>
            <h4>{{details}}</h4>
        </div>`
    
})

Vue.component('product-review', {
    template: `<form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the errors</b>
            <p>
                <ul>
                    <li v-for="record in errors">
                        {{record}}
                    </li>
                </ul>
            </p>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="Name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
            <label>Would you recommend this product?</label>
            <label>Yes<input type="radio" value="Yes" v-model="recommand">
            </label>
            <label>No<input type="radio" value="No" v-model="recommand">
            </label>
        </p>
        <p>
            <input type="submit" value="Submit">
        </p>
    </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recommand: null
        }
    },
    methods : {
        onSubmit : function() {
            this.errors.splice(0,this.errors.length);
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name : this.name,
                    review :  this.review,
                    rating : this.rating,
                    recommand: this.recommand 
                }
                this.$emit('review-submitted',productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommand = null;
            }
            else {
                if(!this.name) this.errors.push("Name is required");
                if(!this.review) this.errors.push("Review is required");
                if(!this.rating) this.errors.push("Rating is required");
                if(!this.recommand) this.errors.push("Recommand product is required");
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab : selectedTab === tab}"
                v-for="(tab, index) in tabs" :key="index"
                @click="selectedTab = tab">
                    {{ tab }}
                </span>
            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no review yet</p>
                <p v-else>
                    <ul>
                        <li v-for="record in reviews">
                            {{ record.name}} {{record.review}}
                            {{ record.rating}}
                        </li>
                    </ul>
                </p>    
            </div>
            <br>
            <product-review v-show="selectedTab === 'Make a Review'"> 
                @review-submitted="addReview"></product-review>
        </div>
    `,

    data()  {
        return {
            tabs: ['Reviews','Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})


var app = new Vue({
    el: '#App',
    data: {
        premium : false,
        details : "Mr Incredible Socks",
        cart : []
    },
    methods : {
        updateCart : function(Id) {
            this.cart.push(Id);
        },

        removeItem : function(Id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === Id) {
                   this.cart.splice(i, 1);
                   break;
                }
            }
        }
    }
});


