const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var mongoose = require('mongoose');
var Post = require("../models/post");

const dbuser = process.env.MLAB_USER;
const dbpass = process.env.MLAB_PASS;
mongoose.connect('mongodb://'+dbuser+':'+dbpass+'@ds237922.mlab.com:37922/dndarchive');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
})

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.log(error); }
    res.send({
      posts: posts
    })
  }).sort({_id: -1})
})

//Add new post
app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

var server = app.listen(process.env.PORT || 8081, function () {
  var port = server.address().port;
  console.log('Server is listening at port %s', port);
});

function stop() {
  server.close();
  mongoose.disconnect();
}

module.exports = server;
module.exports.stop = stop;
