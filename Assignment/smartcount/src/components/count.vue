<template>
  <div>
    <h1>Smart Count</h1>
    <h2>Please enter the number followed by Enter/Return key</h2>
    <input type="number" v-model="numberadded" v-on:keyup.enter="StartCounter" v-on:keydown="ResetCounter" />
    <CountAction v-if=userselection :entry="finalnumber" />
  </div>
</template>

<script>
import CountAction from './countaction.vue'

export default {
  name: 'Count',
  components: {
      CountAction
  },
  data() {
    return {
        numberadded: 0,
        userselection: false
    }
  },
  computed: {
    finalnumber: function() {
      var result = this.userselection? this.numberadded : 0; 
      return Number(result);
    }
  },
  methods: {
    StartCounter() {
      this.userselection = true;
      console.log("User selected : ",this.numberadded);
    },
    ResetCounter() {
      if(this.userselection) 
      {
        this.userselection = false;
      }
    }
  }
}
</script>