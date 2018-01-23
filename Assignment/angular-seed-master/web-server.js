const express = require('express');
const app = express();
const port = 8000

app.use(express.static(__dirname + '/app'));
console.log(__dirname);
app.get('*', (request, response) => {
    response.sendFile(__dirname+'/app/index.html');
    console.log(__dirname);
});
app.listen(port);
console.log('server runnig on port 8000');
