var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoDbUrl="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

// endpoint handling request for user registration
router.post('/createPost', function(req,res) {
    // console.log(req.body);

    post = req.body;

    console.log('New post received on server:')
    console.log('User email: ' + post.email);
    console.log('Post content: ' + post.postContent + '\r\n');

    if (post.postContent == null || post.postContent === '') {
      res.send({"responseMessage":"Please enter some content for the post."});
    } else if (post.postContent.length < 20) {
      res.send({"responseMessage":"Please enter at least 20 characters for the post."});
    } else {
      MongoClient.connect(mongoDbUrl, function(err,client) {
        if(err){
          res.status(501).send({"responseMessage":"We could not connect to our database. Please try again later."});
        } else {
          client.db("RateMyDalCourse").collection('Posts').insertOne(post);
          res.status(200).send({"responseMessage":"Post successfully created on discussion forum."});
        }
      });
    }
})

module.exports = router;
