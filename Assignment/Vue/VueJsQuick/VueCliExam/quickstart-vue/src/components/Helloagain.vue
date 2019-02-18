<template>
    <p class="hello-again">
        This is another component.
        <button v-on:click="incrementUp">Add One</button>
        <button v-on:click="resetTheCounter">Reset parent-added values</button>
        <br>
        <span>Current value of the counter: {{counter + counterFromParent}}</span>
    </p>
</template>

<script>
export default {
    name : 'HelloAgain',
    props: ['counterFromParent'],
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        incrementUp : function() {
            this.counter++;
        },
        resetTheCounter() {
            this.countUp = 0;
            this.$emit('counterHasBeenReset', this.countUp);
        }
    }
}
</script>

<style scoped>
p {
    font-size: 16px;
    text-align: center;
    color: tomato;
}
button {
    display: block;
    margin: 10px auto;
    background: tomato;
    color: white;
    border: none;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
}
</style>