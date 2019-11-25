// server.js

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5555;

app.get('/', (req, res) => {
    res.send({ msg: 'success' });
});

server.listen(port, () => {
    console.log('Running server on 127.0.0.1:' + port);
})

io.on('connection', function(socket) {
    // Listen for test and disconnect events
    socket.on('LEMON5', (data) => {
        console.log('received: "' + data.message + '" from client' + socket.id);
        socket.emit('test', "Ok, i got it, " + socket.id);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from ', socket.id);
    });
});;
