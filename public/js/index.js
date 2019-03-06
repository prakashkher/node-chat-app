var socket = io();

socket.on('connect',function (){
    console.log('connected to the server');

    socket.emit('createMessage',{
        from:'user2',
        text:'text2'
    });
});

socket.on('disconnect',function (){
    console.log('disconnected from the server');
});



socket.on('newMessage',function(message){
    console.log('New Message:',message);
});