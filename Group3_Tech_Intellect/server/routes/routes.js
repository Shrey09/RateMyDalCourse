var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

router.get('/fetchUserData', function(req, res){
    var user = [];   // store user data
    MongoClient.connect(url, function(err, client){
        if (err){
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else{
            //fetching user data from the database
            var cursor= client.db("RateMyDalCourse").collection('User').findOne(
                {
                    "email": "chintan.patel@dal.ca"
                }, function(err, result){
                    if (err){
                        res.status(501).send({"Error":"error in finding the user"});
                    }
                    else{
                        console.log("User data: ", result);
                        res.send({"User": result});
                    }
                }
            );
            
            client.close();
        }
    })
})

router.get('/fetchCourses', function(req, res){
    var courses = [];   // store courses
    MongoClient.connect(url, function(err, client){
        if (err){
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else{
            //fetching courses from the database
            var cursor= client.db("RateMyDalCourse").collection('Courses').find();
            cursor.forEach(function(course) { 
                courses.push(course);
            },function(){
                //console.log("Courses: ",courses);
                res.send({"Courses": courses});  
            });
            client.close();
        }
    })
})

router.post('/updateUserData', function(req, res){
    data = req.body;
    MongoClient.connect(url, function(err, client){
        if (err){
            res.status(501).send({"Error":"error in connecting to database"});
        }
        else {
            client.db("RateMyDalCourse").collection('User').updateOne(
                { email: data.email},
                { $set: data },
                function(err, result){
                    if (err) {
                        res.status(501).send({"Error":"error in updating profile"});
                    }
                    else {
                        res.send({data: result});
                    }
                }
            );
        }
    })
})
module.exports = router;