var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

// endpoint handling request for user registration
router.post('/register_user',function(req,res)
{
    console.log(req.body);
    // fetching data from the request body
    user=req.body;
    MongoClient.connect(url,function(err,client) 
    {
        if(err){
            res.status(501).send({"Error":"error in connecting to database"});
        }
        //check if user has already resgistered or not
        else
        {  
            // check username or email already exists or not
            client.db("RateMyDalCourse").collection('User').findOne({
                "$or": [{
                    "email": user.email
                }, {
                    "name": user.name
                }]
            }, function(err, result) {
                if(err) 
                {
                    console.log("error");
                    res.send({"Message":"error in connecting to database"});
                }
                if(result) 
                {
                    res.send({"Message":"Entered email or username already exist"});
                } 
                // Add details of the new user in the mongodb database
                else 
                {
                    client.db("RateMyDalCourse").collection('User').insertOne(user);
                    console.log("User profile added to database");
                    res.status(200).send({"Message":"Registration successful. Please login to continue"});
                }
             }); 
        }
    }); 
})

router.get('/getCourses',function(req,res){
    // array to store the courses
    var courses=[];
    MongoClient.connect(url,function(err,client)
    {
        if(err)
        {
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else
        {
            //fetching courses from the database
            var cursor= client.db("RateMyDalCourse").collection('Courses').find();
            cursor.forEach(function(course) { 
                courses.push(course);
            },function(){
                // send the course list as the response
                console.log("Courses array",courses);
                res.send({"Courses":courses});  
            });
        
        }
    })
})
module.exports = router;