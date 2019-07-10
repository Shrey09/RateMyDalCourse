var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

router.get('/getCourses',function(req,res){
    // array to store the courses
    // var courses=[];
    MongoClient.connect(url,function(err,client)
    {
        var courses = [];
        if(err)
        {
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else
        {
            console.log("Retrieve courses displayed here");

            var cursor= client.db("RateMyDalCourse").collection('Courses').find();
            cursor.forEach(function(course) { 
                courses.push(course);
            },function(){
                // send the course list as the response
                console.log("All Other Courses array",courses);
                res.send({"Courses":courses});  
            });

            client.close();

            //var registerCourse =client.db("RateMyDalCourse").collection('User').find({name: "Nitin Korea"});
            //console.log("Only register Courses array",registerCourse);
            //res.send({"RegisterCourse":registerCourse});
        }
    })
})

router.get('/getCourses/:username',function(req,res){
    // array to store the courses
    // var courses=[];
    let username = req.params.username;
    MongoClient.connect(url,function(err,client)
    {
        var myCourses = [];
        if(err)
        {
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else
        {
            console.log("Retrieve my courses displayed here");
            console.log("Username is" + username);
            
            var cursor= client.db("RateMyDalCourse").collection('User').find({email: username.substring(1)});
            cursor.forEach(function(course) { 
                myCourses.push(course);
            },function(){
                // send the course list as the response
                console.log("All My Courses array",myCourses);
                res.send({"MyCourses":myCourses});  
            });
            client.close();
        }
    })
})

module.exports = router;
