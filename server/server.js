const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const message = require('./utils/message');
const {isString} = require('./utils/validation');
const{User} = require('./utils/user');

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
var userObject = new User();

io.on('connection',(socket)=>{
    
    socket.on('join',(params,callback)=>{
        if(!isString(params.name) || !isString(params.room)){
            return callback('Name and Room Name are required');
        }
        socket.join(params.room);
        socket.emit('newMessage',message.generateMessage('Admin','Hello, Welcome to  Chat room'));
        socket.broadcast.to(params.room).emit('newMessage',message.generateMessage('Admin',`${params.name} has joined`));

        var user = userObject.removeUser(socket.id);
        var user = userObject.addUser(socket.id,params.name,params.room);
        io.to(user.room).emit('updateUsersList',userObject.getUserList(user.room));

        callback();
    })

    socket.on('disconnect',()=>{
        var user = userObject.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUsersList',userObject.getUserList(user.room));
            io.to(user.room).emit('newMessage',message.generateMessage('Admin',`${user.name} has left`));
        }
    });

    socket.on('createMessage',(msg,callback)=>{
        var user = userObject.getUser(socket.id);
        if(user && isString(msg.text)){
            io.to(user.room).emit('newMessage',message.generateMessage(user.name,msg.text));
        }
        callback();
    });

    socket.on('sendLocation',(coords)=>{
        var user = userObject.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',message.generateLocationMessage(user.name,coords.lat,coords.lng));
        }
    });
});

