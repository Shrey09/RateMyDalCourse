var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

router.get('/fetchUserData', function (req, res) {
    var user = [];   // store user data
    MongoClient.connect(url, function (err, client) {
        if (err) {
            res.status(501).send({ "Error": "error in connecting to database" });
        }
        else {
            //fetching user data from the database
            var cursor = client.db("RateMyDalCourse").collection('User').findOne(
                {
                    "email": "chintan.patel@dal.ca"
                }, function (err, result) {
                    if (err) {
                        res.status(501).send({ "Error": "error in finding the user" });
                    }
                    else {
                        encryptedPassword = result.password;
                        decryptedPassword = "";

                        // http://codeniro.com/caesars-cipher-algorithm-javascript/
                        //loop through each caharacter in the text
                        for (var i = 0; i < encryptedPassword.length; i++) {
                            var c = encryptedPassword.charCodeAt(i);

                            if (c >= 65 && c <= 90) {
                                decryptedPassword += String.fromCharCode((c - 65 + 13) % 26 + 65);
                            }
                            else if (c >= 97 && c <= 122) {
                                decryptedPassword += String.fromCharCode((c - 97 + 13) % 26 + 97);
                            }
                            else {
                                decryptedPassword += encryptedPassword.charAt(i);
                            }
                        }
                        
                        result.password = decryptedPassword;
                        res.send({ "User": result });
                    }
                }
            );

            client.close();
        }
    })
})

router.get('/fetchCourses', function (req, res) {
    var courses = [];   // store courses
    MongoClient.connect(url, function (err, client) {
        if (err) {
            res.status(501).send({ "Error": "error in connecting to database" });
        }
        else {
            //fetching courses from the database
            var cursor = client.db("RateMyDalCourse").collection('Courses').find();
            cursor.forEach(function (course) {
                courses.push(course);
            }, function () {
                //console.log("Courses: ",courses);
                res.send({ "Courses": courses });
            });
            client.close();
        }
    })
})

router.post('/updateUserData', function (req, res) {
    data = req.body;
    updated_model = {
        "name": data.name, "email": data.email,
        "password": data.password, "courses": data.courses
    };
    console.log(updated_model);
    console.log(data);
    MongoClient.connect(url, function (err, client) {
        if (err) {
            res.status(501).send({ "Error": "error in connecting to database" });
        }
        else {
            client.db("RateMyDalCourse").collection('User').updateOne(
                { email: data.email, password: data.old_password },
                { $set: updated_model },
                function (err, result) {
                    if (err) {
                        res.status(501).send({ "Error": "error in updating profile" });
                    }
                    else {
                        if (result.modifiedCount == 0) {
                            console.log("Not Modified");
                            res.send({ "status": "NOT_MODIFIED" });
                        }
                        else if (result.modifiedCount == 1) {
                            console.log("Modified");
                            res.send({ "status": "MODIFIED" });
                        }
                        else {
                            console.log("SOMETHING_WRONG: ", result);
                            res.send({ "status": "SOMETHING_WRONG" });
                        }
                    }
                }
            );
            client.close();
        }
    })
})
module.exports = router;