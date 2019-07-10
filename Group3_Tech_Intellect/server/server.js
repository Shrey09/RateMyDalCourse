const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=3000;

//creating the express server
const app=express();
app.use(bodyParser.json());
app.use(cors());

//importing all the routes and its associated actions
var routes=require('./routes/routes');
app.use('/',routes);

// starting the server on port 3000
app.listen(port,function(){
    console.log("Server runinng on localhost:"+port);
})