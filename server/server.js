const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const message = require('./utils/message');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
console.log(publicPath);
var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User connected');
    socket.emit('newMessage',message.generateMessage('Admin','Hello, Welcome to  Chat room'));

    socket.broadcast.emit('newMessage',message.generateMessage('Admin','New user joined'));

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    socket.on('createMessage',(msg)=>{
        socket.broadcast.emit('newMessage',message.generateMessage(msg.from,msg.text));
    });
});

