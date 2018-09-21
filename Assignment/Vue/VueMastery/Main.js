"use strict";

var product = "Socks";

var app = new Vue({
    el: '#App',
    data : {
        product : 'Socks',
        description: 'A pair of warm, fuzzy socks',
        image:"./vmSocks-green-onWhite.jpg",
        ProductLink:'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        onSale: true,
        showproductlink: true,
        Details: ["80% Cotton","20% Polyster","Gender-neutral"],
        Sizes: ["Small","Medium","Large","Ex-Large"],
        variants: [
            {
                variantId : 2234,
                variantColor: "Green",
                variantImage: "./vmSocks-green-onWhite.jpg"
            },
            {
                variantId : 2235,
                variantColor: "Blue",
                variantImage: "./vmSocks-blue-onWhite.jpg"
            }
        ],
        cart: 0,
        inStock: true
    },
    methods : {
        addToCart : function() {
            this.cart++;
        },

        updateProduct : function(variantImage) {
            this.image = variantImage;
        },

        removeFromCart : function() {
            this.cart--;
        }
    }
});