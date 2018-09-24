'use strict';

Vue.component('todo-item',{
    props: ['todo'],
    template: '<li>{{todo.item}}</li>'
})


new Vue({
    el : '#app',
    data: {
        title: "Welecome the cool world of Vue.js",
        message1 : 'Hello World',
        skillset : ["Learn Vue.js",
                 "Learn Firebase",
                 "Learn JEST"],
        todoList : [
        { Id : 1,
            item: 'Prepare Tomorrow\'s lunch'
        },
        { Id : 2,
            item: 'Start preparing head first series'
        },
        { Id : 3,
            item: 'Postpone Dentist Visit'
        }
        ],
        rawHTML: "<span style=\"color:green\">This should be green</span>",
        isButtonDisabled : undefined
    },
    methods:{
        reverseMessage : function() {
            this.message1 = this.message1.split('').reverse().join('');
            this.title = "Let's try to modify it";
        }
    }
});

new Vue({
    el : '#app1',
    data: {
        message : 'Hello Again',
        seen: false,
        url: "http://www.esakal.com",
        otherstring: ''
    },
    computed : {
        reversestring : function() {
            this.otherstring = this.message.split('').reverse().join('');
            return this.otherstring;
        }
    }
});