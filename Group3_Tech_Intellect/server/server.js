// Author: Harsh Pamnani - B00802614

// Defining all the libraries required
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=3000;

// Initializing express and telling the app to user bodyParser
const app=express();
app.use(bodyParser.json());
app.use(cors());

// Tell the application to use routes
var routes=require('./routes/routes');
app.use('/',routes);

// Started listening on the defined port
app.listen(port,function(){
    console.log('Server : Started running on port: ' + port);
})
