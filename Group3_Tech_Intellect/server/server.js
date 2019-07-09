const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port=3000;

const app=express();
app.use(bodyParser.json());
app.use(cors());

var routes=require('./routes/routes');
app.use('/',routes);

app.listen(port,function(){
    console.log("Server runinng on localhost:"+port);
})
