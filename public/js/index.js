var socket = io();

socket.on('connect',function (){
    console.log('connected to the server');

    
});

socket.on('disconnect',function (){
    console.log('disconnected from the server');
});



socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var messsageHTML = Mustache.render(template,{
        from : message.from,
        text:message.text,
        createdAt:formattedTime
    });
    jQuery('#messages').append(messsageHTML);
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
    var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var messageHTML = Mustache.render(template,{
        from : locationMessage.from,
        url:locationMessage.url,
        createdAt:formattedTime
    });
   
    jQuery('#messages').append(messageHTML);
});