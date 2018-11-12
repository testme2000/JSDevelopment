var messageList = Vue.component("messages", {
    template: "#messages-list",
    props: ['chat','removemessage'],
    methods: {
        getRelativeTime: function(timeStamp) {
            var now = new Date();
            var secondsPast = (now.getTime() - timeStamp.getTime())/1000;
            if(secondsPast < 60) {
                return parseInt(secondsPast) + ' Seconds Ago';
            }
            if(secondsPast <= 3600) {
                return parseInt(secondsPast/60) + ' Minutes Ago';
            }
            if(secondsPast <= 86400) {
                return parseInt(secondsPast/3600) + ' Hours Ago';
            }
            if(secondsPast > 86400) {
                day = timeStamp.getDate(); 
                month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ",""); 
                year = timeStamp.getFullYear() == now.getFullYear() ? "" : " "+timeStamp.getFullYear(); 
                return day + " " + month + year;
            }
        }
    }
});

var removemessage = Vue.component("removemessage", {
    template: "#remove_message",
    props: ["removemessagefunction"]
});

var messageItem = Vue.component("messageitem", {
    template: "#message-item",
    props: ["message"]
});

var chatForm = Vue.component("chatform", {
    template : "#chat-form",
    props: ["save", "totalmessages"],
    data : function() {
        return {
            message: "",
            hasErrors: false
        }
    },
    methods : {
        empty: function() {
            if(this.message)
            {
                this.message = "";
                this.hasErrors = false;
            }
            else {
                this.hasErrors = true;
            }
        }
    }
});



new Vue({
    el : '#root',
    data : {
        appName : 'Welcome to chat App',
        messages : [
            { text: "How are you", time: new Date()},
            { text: "Doing good", time: new Date()},
            { text: "Nice to here", time: new Date()}
        ],
    },
    
    methods : {
            save : function(message) {
                if(message) {
                    this.messages.push({text: message, time: new Date()});
                }
            },
            removemessage : function(index) {
                this.messages.splice(index,1);
            }
    }
})