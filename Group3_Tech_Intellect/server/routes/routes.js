var express = require('express'); // Define express
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// Connection string for the MongoDb
var url="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

// Connect routes to the service
router.get('/getCourses',function(req,res){
   
    MongoClient.connect(url,function(err,client)
    {
        var courses = [];

        // Display the error while connecting to the database
        if(err)
        {
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else
        {
           
            // Check if the courses are present in the Mongo database
            var cursor= client.db("RateMyDalCourse").collection('Courses').find();
            // Callback function to retrieve the all courses
            cursor.forEach(function(course) { 
                courses.push(course);
            },function(){
              
                // response is sent to the node from the database
                res.send({"Courses":courses});  
            });

            // close the client to stop overflooding
            client.close();
        }
    })
})

router.get('/getCourses/:username',function(req,res){
   
    // Username is fetched for which we need to retrieve the courses.
    let username = req.params.username;
    MongoClient.connect(url,function(err,client)
    {
        // define array to store all the user courses.
        var myCourses = [];
        if(err)
        {
            // Display the error while connecting to the database
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else
        {
            // check for the courses for a logged in user in the database          
            var cursor= client.db("RateMyDalCourse").collection('User').find({email: username.substring(1)});
            cursor.forEach(function(course) { 
                 // store all the user's courses in the list
                myCourses.push(course);
            },function(){
              
                // send the response to the node which has the list of user's courses
                res.send({"MyCourses":myCourses});  
            });

              // close the client to stop overflooding of request
            client.close();
        }
    })
})



            router.get('/displayrating/:subject',function(req,res){

                // Fetching the course name from the request
                let subject = req.params.subject;

                MongoClient.connect(url,function(err,client)
                {
                    var ratecourses = [];

                    // Display the error while connecting to the database
                    if(err)
                    {
                        res.status(501).send({"Error":"error in connecting to database"});
                    }
                    else
                    {

            // Query in the database to find overall rating of the subject 
            var cursor= client.db("RateMyDalCourse").collection('Rate').find({Name: subject});
            cursor.forEach(function(rate) { 
                
                // store all the ratings in the list
                ratecourses.push(rate); 
            },function(){
                
                // send the rating to node server
                res.send({"Ratecourses":ratecourses});  
            });


              // close the client to stop overflooding of request
            client.close();
        }
    })
})

module.exports = router;
