// Author: Deep Nimesh Shah - B00796368
// Define all the parameters and Libraries for the server
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=3000;

const app=express();
app.use(bodyParser.json());
app.use(cors());

//importing all the routes and its associated actions
var routes=require('./routes/routes');
app.use('/',routes);

// Started listening on the defined port which is 3000
app.listen(port,function(){
    console.log("Server runinng on localhost:"+port);
})