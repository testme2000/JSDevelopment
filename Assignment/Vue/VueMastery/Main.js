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
        <div class="cart">
            <p>Cart{{ cart }}</p>
        </div>
        <span>
            <button v-on:click="removeFromCart">Remove From Cart</button>
        </span>
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
            cart: 0
        }
    },

    methods: {
        // Product related methods goes here
        addToCart : function() {
            this.cart++;
        },
    
        updateProduct : function(index) {
            this.selectedVariant = index;
            console.log("selected variant " +  index);
        },
    
        removeFromCart : function() {
            this.cart--;
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

var app = new Vue({
    el: '#App',
    data: {
        premium : false,
        details : "Mr Incredible Socks"
    }
});


