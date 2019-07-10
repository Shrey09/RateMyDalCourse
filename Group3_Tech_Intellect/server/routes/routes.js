var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

router.get('/getCourses',function(req,res){
    // array to store the courses
    var courses=[];
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



            //var registerCourse =client.db("RateMyDalCourse").collection('User').find({name: "Nitin Korea"});
            //console.log("Only register Courses array",registerCourse);
            //res.send({"RegisterCourse":registerCourse});
        }
    })
})
module.exports = router;
