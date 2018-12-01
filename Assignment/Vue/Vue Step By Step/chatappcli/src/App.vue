<template>
  <div id="app">
    <div class="app-header">
    <h1>Welcome to Chat Application</h1>
    </div>
    <div id="appcontainer"> 
      <chatlist :chats="messages" ></chatlist> 
      <chatform :isEmptyText="isMessageEmpty" :save="save"></chatform>
    </div>
  </div>
</template>

<script>
  import chatlist from "./components/chat/chatlist"
  import chatform from "./components/chat/chatform"

  export default {
    name: 'App',
    components: {
      chatlist,
      chatform
    },
    data : function() {
      return {
        isMessageEmpty : false,
        messages: [ {text: "Hello, how are you?"},
                    {text: "Hello, I am fine"},
                    {text: "Another find day"},
                    {text: "Yes indeed"}
                   ]
        } 
    },
    methods: {
      save: function(message) {
        if(message) {
          this.messages.push({text:message});
        }
        else {
          this.isMessageEmpty = true;
        }
      }
    }
  }
</script>

<style scope>
  .app-header {
    text-align: center;
  }
  #app-container {
    padding: 50px;
  }
</style>
