"use strict";

var product = "Socks";

var app = new Vue({
    el: '#App',
    data : {
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
    },
    methods : {
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
    computed : {
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
        }
        
    }
});