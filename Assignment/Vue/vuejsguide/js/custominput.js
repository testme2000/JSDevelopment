

Vue.component('custom-input',{
    template: `<div>
                    <input v-bind:value="value" v-on:input= "$emit('input', $event.target.value)" >
              </div>`,
    props: ['value']
})



new Vue({
    el : '#custApp',
    data : {
        searchText : 'Testing of Custom Event',
        anotherText : 'this is another event'
    }
})