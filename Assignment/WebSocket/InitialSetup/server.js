
var WebSockerServer = require('ws').Server, wss = new WebSockerServer({port: 8181});

wss.on('connection', function(ws) {
    console.log('client connected');
    ws.on('message', function(message) {
        console.log("Message Received : " + message);
    });
});



