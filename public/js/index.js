var socket = io();

socket.on('connect',function (){
    console.log('connected to the server');

    
});

socket.on('disconnect',function (){
    console.log('disconnected from the server');
});



socket.on('newMessage',function(message){
    console.log('New Message:',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function (e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{from:'User',text:messageTextbox.val()},function(){
        messageTextbox.val('');
    });
});

var locationBtn = jQuery('#send-location');

locationBtn.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geo Location is not supported');
    }
    locationBtn.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        
        socket.emit('sendLocation',{
            from:'User',
            lat:position.coords.latitude,
            lng:position.coords.longitude
        });
        locationBtn.removeAttr('disabled').text('Send Location');
    },function(){
        locationBtn.removeAttr('disabled').text('Send Location');
        return alert('Unable to fetch location');
    });
});

socket.on('newLocationMessage',function (locationMessage){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Location</a>');
    a.attr('href',locationMessage.url);
    li.text(`${locationMessage.from}: `);
    li.append(a);
    jQuery('#messages').append(li);
});