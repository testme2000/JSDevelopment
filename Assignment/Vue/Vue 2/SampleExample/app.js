const app = new Vue({
    el : '#app',
    data: {
        message : 'Hello Vue! TEst IT',
        price: 18 + 6,
        details: ['one','two','three','chacha']
    },
    computed: {
        messageToLower() {
            return this.message.toLowerCase();
        }
    }
});