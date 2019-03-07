const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

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
    socket.emit('newMessage',{
        from:'Admin',
        text:'Hello, Welcome to  Chat room',
        createdAt:new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt:new Date().getTime()
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    socket.on('createMessage',(msg)=>{
        socket.broadcast.emit('newMessage',{
            from:msg.from,
            text:msg.text,
            createdAt:new Date().getTime()
        });
    });
});

