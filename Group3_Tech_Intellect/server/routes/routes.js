var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

router.get('/fetchUserData', function (req, res) {
    // Author: Chintan Patel
    // Banner ID: B00826089
    var user = [];   // store user data

    // connect to MongoClient
    MongoClient.connect(url, function (err, client) {
        if (err) {
            res.status(501).send({ "Error": "error in connecting to database" });
        }
        else {
            //fetching user data from the database
            var cursor = client.db("RateMyDalCourse").collection('User').findOne(
                {
                    "email": "chintan.patel@dal.ca"   // this email can be made dynamic
                }, function (err, result) {
                    if (err) {
                        res.status(501).send({ "Error": "error in finding the user" });
                    }
                    else {
                        encryptedPassword = result.password;   // fetched password which is encrypted
                        decryptedPassword = "";   // decrypted password will be stored here

                        // http://codeniro.com/caesars-cipher-algorithm-javascript/
                        // This source is used to decrypt the password.
                        // Some changes like function removal, shift changes are made in the code
                        // taken from the sourse.
                        // loop through each caharacter in the text
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
                        res.send({ "User": result });   // sent result to front end.
                    }
                }
            );

            client.close();   // close the client.
        }
    })
})

router.get('/fetchCourses', function (req, res) {
    // Author: Chintan Patel
    // Banner ID: B00826089
    var courses = [];   // store courses

    // connect to the MongoClient.
    MongoClient.connect(url, function (err, client) {
        if (err) {
            res.status(501).send({ "Error": "error in connecting to database" });
        }
        else {
            //fetching courses from the database
            var cursor = client.db("RateMyDalCourse").collection('Courses').find();
            cursor.forEach(function (course) {
                courses.push(course);   // push course to courses array which will be returned.
            }, function () {
                //console.log("Courses: ",courses);
                res.send({ "Courses": courses });
            });
            client.close();   // close the client
        }
    })
})

router.post('/updateUserData', function (req, res) {
    // Author: Chintan Patel
    // Banner ID: B00826089
    data = req.body;   // data which is sent from fornt end and it is entered by the user.
    updated_model = {   // updated model
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

            // update profile in the database
            client.db("RateMyDalCourse").collection('User').updateOne(
                { email: data.email, password: data.old_password },
                { $set: updated_model },
                function (err, result) {
                    if (err) {
                        res.status(501).send({ "Error": "error in updating profile" });
                    }
                    else {

                        // different status will be returned to front end

                        // If 0 rows are changed, then the old password is wrong or
                        // no data is to be changed.
                        if (result.modifiedCount == 0) {
                            console.log("Not Modified");
                            res.send({ "status": "NOT_MODIFIED" });
                        }
                        
                        // If 1 row is changed, then the data is updated.
                        else if (result.modifiedCount == 1) {
                            console.log("Modified");
                            res.send({ "status": "MODIFIED" });
                        }

                        // If database is not able to connect to other errors.
                        else {
                            console.log("SOMETHING_WRONG: ", result);
                            res.send({ "status": "SOMETHING_WRONG" });
                        }
                    }
                }
            );
            client.close();   // close the client.
        }
    })
})
module.exports = router;