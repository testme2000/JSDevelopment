"use strict";

var watchSample = new Vue({
    el : '#watch-sample',
    data : {
        question : '',
        answer : 'Let me think, first ask proper question'
    },
    watch : {
        question : function(newQuestion, oldQuestion) {
            this.answer = "Stop asking so many question";
            this.debouncedGetAnswer()
        }
    },
    created: function() {
        this.debouncedGetAnswer = _.debounce(this.getAnswer,500);
    },
    methods : {
        getAnswer : function() {
            if(this.question.indexOf('?') === -1) {
                this.answer = "Ask question with proper form, need ?";
                return;
            }
            this.answer = "Let me think";
            var vm = this;
            axios.get('https://yesno.wtf/api')
                .then(function(response) {
                    vm.answer = _.capitalize(response.data.answer);
                })
                .catch(function(error) {
                    vm.answer = 'Error. Api not available ' + error; 
                })
        }
    }
})