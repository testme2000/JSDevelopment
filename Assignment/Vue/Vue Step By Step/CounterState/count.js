
new Vue({
    el : '#CountApp',
    data : {
        head : 'Let try to test Vuex',
        Count : 0
    },
    methods : {
        increment : function() {
            this.Count++;
        },
        decrement : function() {
            this.Count--;
        }
    }
})

const store = new Vuex.Store({
    state : {
        XCount : 0,
        Songs : ["Havana Unana",'Fly like eagle','You are so beautiful']
    },
    mutations : {
        increment(state) {
            state.XCount++;
        },
        decrement(state) {
            state.XCount--;
        },
        multiply(state) {
            state.XCount *= state.XCount;
        },
        addnewsong : function(state) {
            state.Songs.push('Dhobho bhoo');
        },
        addkawali : function(state,songname) {
            state.Songs.push(songname);
            console.log('Added Kawali : ' + songname);
        }
    },
    getters : {
        getalbum : state => {
            return state.Songs;
        }
    },
    actions : {
        addkawali : function(context) {
            context.commit("addkawali","Are lassi pyali");
        }
    }
});

store.commit('increment');
console.log(store.state.XCount);
store.commit('increment');
store.commit('increment');
console.log(store.state.XCount);
store.commit('increment');
store.commit('increment');
console.log(store.state.XCount);
store.commit('decrement');
console.log('This is decrement : ' + store.state.XCount);
store.commit('multiply');
console.log('This is Multiply : ' + store.state.XCount);
console.log(store.getters.getalbum)
store.commit('addnewsong');
console.log(store.getters.getalbum);
store.commit('addkawali','Meku Aur Teku');
console.log(store.getters.getalbum);
store.dispatch("addkawali");
console.log(store.getters.getalbum);
