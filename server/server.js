const express = require('express');
const path = require('path');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
console.log(publicPath);
var app = express();
app.use(express.static(publicPath));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});