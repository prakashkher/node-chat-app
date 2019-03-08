const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const message = require('./utils/message');
const {isString} = require('./utils/validation');

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

    socket.on('join',(params,callback)=>{
        if(!isString(params.name) || !isString(params.room)){
            callback('Name and Room Name are required');
        }
        callback();
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    socket.on('createMessage',(msg,callback)=>{
        io.emit('newMessage',message.generateMessage(msg.from,msg.text));
        callback();
    });

    socket.on('sendLocation',(coords)=>{
        console.log('sendLocation');
        io.emit('newLocationMessage',message.generateLocationMessage(coords.from,coords.lat,coords.lng));
    });
});

