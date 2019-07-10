// https://www.youtube.com/watch?v=jwA-9XXybdM&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=45 
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const PORT=3000;

// instance of express server
const app=express();

app.use(bodyParser.json());

app.use(cors());

// importing all the routes
var routes=require('./routes/routes');
app.use('/',routes);

// start the server
app.listen(PORT,function(){
    console.log("Server runinng on localhost:"+PORT);
})