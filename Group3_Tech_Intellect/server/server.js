// Author: Shrey Amin
// Banner ID: B00822245
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=19999;

//creating the express server
const app=express();
// using body parser and cors
app.use(bodyParser.json());
app.use(cors());

//importing all the routes and its associated actions
var routes=require('./routes/routes');
app.use('/',routes);

// starting the server on port 19999
app.listen(port,function(){
    console.log("Server runinng on localhost:"+port);
})