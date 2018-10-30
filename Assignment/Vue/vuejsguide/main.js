'use strict';

Vue.component('todo-item',{
    props: ['todo'],
    template: `<li>{{todo.item}}
                <button @click="todoRemove(todo.Id)">Remove</button>
              </li>`,
    methods : {
        todoRemove : function(todoid) {
            alert(todoid);
            this.$emit('remove',todoid)
        }
    }              
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
        isButtonDisabled : undefined,
        ActiveSpray: 'red',
        activeFont: 30,
        errorFound : true
    },
    methods:{
        reverseMessage : function() {
            this.message1 = this.message1.split('').reverse().join('');
            this.title = "Let's try to modify it";
        },

        removeTodo : function(id) {
            alert(id);
            var foundit = this.todoList.map(function(fnd) { return fnd.Id; }).indexOf(id);
            this.todoList.splice(foundit,1);
        }
    }
});

new Vue({
    el : '#app1',
    data: {
        message : 'Hello Again',
        seen: false,
        url: "http://www.esakal.com",
        otherstring: '',
        firstName : 'Meku',
        lastName : 'Patel',
        multiln : '',
        checkState : true,
        checkgroup : [],
        radioval : ''
    },
    computed : {
        reversestring : function() {
            this.otherstring = this.message.split('').reverse().join('');
            return this.otherstring;
        },

        fullName : {
            get : function() {
                return  this.firstName + " " + this.lastName;
            },

            set : function(newValue) {
                var names = newValue.split(' ');
                this.firstName = names[0];    
                this.lastName = names[1];
            }


        }
    }
});
