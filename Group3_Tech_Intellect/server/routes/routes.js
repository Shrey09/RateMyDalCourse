var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoDbUrl="mongodb+srv://shrey:web12345@ratemydalcourse-rqsoy.mongodb.net/test?retryWrites=true&w=majority";

var badWords = require('bad-words');
var badWordsFilter = new badWords();

router.post('/createPost', function(req,res) {
    // console.log(req.body);

    post = req.body;

    console.log('New post received on server:')
    console.log('User email: ' + post.postedByEmail);
    console.log('Post content: ' + post.postContent);

    if (post.postContent == null || post.postContent === '') {
      res.send({"responseMessage":"Please enter some content for the post."});
      console.log('ERROR: The post is empty.');
    } else if (post.postContent.length < 20) {
      res.send({"responseMessage":"Please enter at least 20 characters for the post."});
      console.log('ERROR: The post has less than 20 characters.');
    } else if (badWordsFilter.isProfane(post.postContent)) {
      res.send({"responseMessage":"Your post contains bad words. Please remove them and try again."});
      console.log('ERROR: The post contains bad words.');
    } else {
      MongoClient.connect(mongoDbUrl, function(err,client) {
        if(err){
          res.status(501).send({"responseMessage":"We could not connect to our database. Please try again later."});
          console.log('ERROR: MongoDB connection failed.');
        } else {
          client.db("RateMyDalCourse").collection('Posts').insertOne(post);
          res.status(200).send({"responseMessage":"Post successfully created on discussion forum."});
          console.log('SUCCESS: Post successfully created.');
        }
      });
    }
    console.log('');
})

module.exports = router;
