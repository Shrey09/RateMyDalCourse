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


// app.post('/createPost', function (req, res) {
//   console.log(req.body);
//   res.status(200).send({"message": "HP Data received"});
// })

// creating the server
app.listen(port,function(){
    console.log("Server runinng on localhost:"+port);
})
