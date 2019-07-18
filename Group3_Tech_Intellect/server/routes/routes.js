// Author: Harsh Pamnani - B00802614

// Defining all the libraries required.
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoDbUrl = "mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";
var url = "mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

// Initializing the bad-words library.
var badWords = require('bad-words');
var badWordsFilter = new badWords();

const jwt = require('jsonwebtoken');


const checkAuth = require("../middleware/check-auth");

// Creating a post mapping for route /createPost.
router.post('/createPost', checkAuth, function (req, res) {
  // Author - Harsh Pamnani - B00802614

  post = req.body;
  console.log('Server : New post received: ', post)

  // Applying validations on the received post.
  // Checking if the post is empty.
  if (post.postContent == null || post.postContent === '') {
    res.send({ "responseMessage": "Please enter some content for the post." });
    console.log('ERROR: The post is empty.');
  }
  // Checking if the post length is below 20.
  else if (post.postContent.length < 20) {
    res.send({ "responseMessage": "Please enter at least 20 characters for the post." });
    console.log('ERROR: The post has less than 20 characters.');
  }
  // Checking that the post does not contain any bad words.
  else if (badWordsFilter.isProfane(post.postContent)) {
    res.send({ "responseMessage": "Your post contains bad words. Please remove them and try again." });
    console.log('ERROR: The post contains bad words.');
  }
  // If all validation pass, creating the post in database.
  else {
    MongoClient.connect(mongoDbUrl, function (err, client) {
      if (err) {
        // Sending the error response message to client, in case of error.
        res.status(501).send({ "responseMessage": "We could not connect to our database. Please try again later." });
        console.log('Server : MongoDB connection failed.');
      } else {
        // Creating the post in database and sending response to client.
        client.db("RateMyDalCourse").collection('Posts').insertOne(post);
        res.status(200).send({ "responseMessage": "Post successfully created on discussion forum." });
        console.log('Server : Post successfully created.');
        client.close();
      }
    });

  }
})

// Creating a post mapping for route /createPost.
router.get('/getPosts/:courseCode', function (req, res) {
  // Author - Harsh Pamnani - B00802614
  // Creating an empty array for storing posts.
  var posts = [];

  // Getting the course code from request
  const courseCodeFromClient = req.params.courseCode;

  // Connecting to mongodb database.
  MongoClient.connect(mongoDbUrl, function (err, client) {
    if (err) {
      // Sending the error response message to client, in case of error.
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {
      console.log("Course code received from client is: " + courseCodeFromClient);

      // Fetching all the posts related to that course from database and sending it back to client.
      var cursor = client.db("RateMyDalCourse").collection('Posts').find({ courseCode: courseCodeFromClient });
      cursor.forEach(function (dbPost) {
        posts.push(dbPost);
      }, function () {
        res.send({ "Posts": posts });
      });

      client.close();
    }
  })
});

// Exporting the router
router.get('/getCourses', function (req, res) {

  MongoClient.connect(url, function (err, client) {
    var courses = [];

    // Display the error while connecting to the database
    if (err) {
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {

      // Check if the courses are present in the Mongo database
      var cursor = client.db("RateMyDalCourse").collection('Courses').find();
      // Callback function to retrieve the all courses
      cursor.forEach(function (course) {
        courses.push(course);
      }, function () {

        // response is sent to the node from the database
        res.send({ "Courses": courses });
      });

      // close the client to stop overflooding
      client.close();
    }
  })
});

router.get('/getCourses/:username', function (req, res) {

  // Username is fetched for which we need to retrieve the courses.
  let username = req.params.username;
  MongoClient.connect(url, function (err, client) {
    // define array to store all the user courses.
    var myCourses = [];
    if (err) {
      // Display the error while connecting to the database
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {
      // check for the courses for a logged in user in the database
      var cursor = client.db("RateMyDalCourse").collection('User').find({ email: username.substring(1) });
      cursor.forEach(function (course) {
        // store all the user's courses in the list
        myCourses.push(course);
      }, function () {

        // send the response to the node which has the list of user's courses
        res.send({ "MyCourses": myCourses });
      });

      // close the client to stop overflooding of request
      client.close();
    }
  })
});



router.get('/displayrating/:subject', function (req, res) {

  // Fetching the course name from the request
  let subject = req.params.subject;

  MongoClient.connect(url, function (err, client) {
    var ratecourses = [];

    // Display the error while connecting to the database
    if (err) {
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {

      // Query in the database to find overall rating of the subject
      var cursor = client.db("RateMyDalCourse").collection('Rate').find({ Name: subject });
      cursor.forEach(function (rate) {

        // store all the ratings in the list
        ratecourses.push(rate);
      }, function () {

        // send the rating to node server
        res.send({ "Ratecourses": ratecourses });
      });


      // close the client to stop overflooding of request
      client.close();
    }
  })
});


router.get('/fetchUserData/:email', function (req, res) {
  // Author: Chintan Patel
  // Banner ID: B00826089
  var user = [];   // store user data
  var email = req.params.email;
  console.log("HP EMAIL IS : ", email);

  // connect to MongoClient
  MongoClient.connect(url, function (err, client) {
    if (err) {
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {
      //fetching user data from the database
      var cursor = client.db("RateMyDalCourse").collection('User').findOne(
        {
          "email": email   // this email can be made dynamic
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
});

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


// endpoint handling request for user registration and storing user data in the database
router.post('/register_user', function (req, res) {
  console.log(req.body);
  // fetching data from the request body
  user = req.body;
  MongoClient.connect(url, function (err, client) {
    if (err) {
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    //check if user has already resgistered or not
    else {
      // checking username or email already exists or not
      client.db("RateMyDalCourse").collection('User').findOne({
        "$or": [{
          "email": user.email
        }, {
          "name": user.name
        }]
      }, function (err, result) {
        // send error message to client
        if (err) {
          console.log("error");
          res.send({ "Message": "error in connecting to database" });
        }
        if (result) {
          res.send({ "Message": "Entered email or username already exist" });
        }
        // Add details of the new user in the mongodb database and send response message to client
        else {
          client.db("RateMyDalCourse").collection('User').insertOne(user);
          console.log("User profile added to database");
          res.status(200).send({ "Message": "Registration successful. Please login to continue" });
        }
        client.close();
      });
    }
  });
})

// endpoint for handling get request to fetch available courses from the database
router.get('/getCourses', function (req, res) {
  // array to store the courses
  var courses = [];
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
        // send the course list as the response
        console.log("Courses array", courses);
        res.send({ "Courses": courses });
      });
      client.close();
    }
  })
});

router.post("/login", (req, res, next) => {
  userinput = req.body;
  console.log("received credentials are this : ", userinput);

  // Getting the course code from request
  const emailFromClient = userinput.email;
  const passwordfromclient = userinput.password;


  // Connecting to mongodb database.
  MongoClient.connect(mongoDbUrl, function (err, client) {
    if (err) {
      // Sending the error response message to client, in case of error.
      res.status(501).send({ "Error": "error in connecting to database" });
    }
    else {
      console.log("Server : email = " + emailFromClient + " and password = " + passwordfromclient);

      // Fetching all the posts related to that course from database and sending it back to client.
      client.db("RateMyDalCourse").collection('User').findOne(
        { email: emailFromClient, password: passwordfromclient },
        function (err, result) {
          if (err) {
            res.send({"authRepsonseMessage": "Server : DB Connection failed"});
          } else if (result) {
            const token = jwt.sign({email: emailFromClient}, 'this_is_the_secret_key', {expiresIn: '1h'});
            res.status(200).send({"authRepsonseMessage": "Login successful", "token": token, "expiresIn": 3600, "user_data": result});
          } else {
            res.send({"authRepsonseMessage": "Authentication failure"});
          }
        }
      );

      client.close();
    }
  })
});

router.get('/getCourseFromCode/:courseCode',function(req,res){
  var courseFromDB;

  const courseCodeFromClient = req.params.courseCode.substring(1);
  MongoClient.connect(mongoDbUrl,function(err,client)
  {
      if(err)
      {
          res.status(501).send({"Error":"error in connecting to database"});
      }
      else
      {
        // console.log("Course code received from client is: " + courseCodeFromClient);

        var cursor = client.db("RateMyDalCourse").collection('Courses').find({ Code: courseCodeFromClient});
        cursor.forEach(function(dbCourse) {
          // console.log("Course from DB is HPHPHP: ",dbCourse);
            courseFromDB = dbCourse;
        },function(){
            // console.log("Course from DB is HP: ",courseFromDB);
            res.send({"Course":courseFromDB});
        });

        client.close();
      }
  })
});

// rate the course
router.post('/rateCourse',function(req,res){
    console.log("rate model at server",req.body)
    var email=req.body.email;
    var rating=req.body.rating;
    var course=req.body.courseName;
    var rateObj={"Email":email,"Name":course,"Rate":rating};
    MongoClient.connect(url,function(err,client)
    {
        if(err){
            res.status(501).send({"Error":"error in connecting to database"});
        }
        //check if user has already rated the course
        else
        {
            // checking username or email already exists or not
            client.db("RateMyDalCourse").collection('Rate').findOne({
                "$and": [{
                    "Email": email
                }, {
                    "Name": course
                }]
            }, function(err, result) {
                // send error message to the client
                if(err)
                {
                    console.log("error");
                    res.send({"Message":"error in connecting to database"});
                }
                // update rating of the user
                if(result)
                {
                    var query = { "Name": course,"Email":email };
                    var newRating = { $set: {"Rate":rating } };
                    client.db("RateMyDalCourse").collection("Rate").updateOne(query, newRating)
                    console.log("Youe rating has been updated");
                    res.status(200).send({"Message":"Your course rating has been updated"});
                }
                // insert rating of the user in the database
                else
                {
                    client.db("RateMyDalCourse").collection('Rate').insertOne(rateObj);
                    console.log("course rating added to database");
                    res.status(200).send({"Message":"Thank you for rating the course"});
                }
            client.close();
             });
        }
    })
})

// endpoint for fetching the rated courses
router.post('/getRatedCourses',function(req,res){
  // array to store the courses
  console.log("user email",req.body.name)
  var ratedcourses=[];
  MongoClient.connect(url,function(err,client)
  {
      if(err)
      {
          res.status(501).send({"Error":"error in connecting to database"});
      }
      else
      {
          //fetching courses from the database
          var cursor= client.db("RateMyDalCourse").collection('Rate').find({"Email": req.body.name});
          cursor.forEach(function(course) {
              ratedcourses.push(course);
          },function(){
              // send the course list as the response
              console.log("Rated courses array",ratedcourses);
              res.send({"Courses":ratedcourses});
          });
      client.close();
      }
  })
})

module.exports = router;
