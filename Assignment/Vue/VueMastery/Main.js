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
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no review yet</p>
            <ul>
                <li v-for="record in reviews">
                    {{ record.name}} {{record.review}}
                    {{ record.rating}}
                </li>
            </ul>
        </div>
        <br>
        <product-review @review-submitted="addReview"></product-review>
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
            <input type="submit" value="Submit">
        </p>
    </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods : {
        onSubmit : function() {
            let productReview = {
                name : this.name,
                review :  this.review,
                rating : this.rating 
            }
            this.$emit('review-submitted',productReview);
            this.name = null;
            this.review = null;
            this.rating = null;
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


