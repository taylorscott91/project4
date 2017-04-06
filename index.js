const express = require('express')
const Post = require('./db/models.js').Post
const parser = require("body-parser")

const app = express()

app.set('port', process.env.PORT || 3001)
app.set('view engine', 'hbs')

app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.listen(app.get('port'), () => {
  console.log(`Partying hard on ${app.get('port')}`)
})

app.get("/", function(req, res){
  res.render("posts");
});

app.get("/api/posts", function(req, res){
  Post.find({}).then(function(posts){
    res.json(posts)
  });
});

app.get("/api/posts/:title", function(req, res){
  Post.findOne({title: req.params.title}).then(function(post){
    res.json(post)
  });
});

app.post("/api/posts", function(req, res){
  Post.create(req.body).then(function(post){
    res.json(post)
  })
});

app.delete("/api/posts/:title", function(req, res){
  Post.findOneAndRemove({title: req.params.title}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/posts/:title", function(req, res){
  Post.findOneAndUpdate({title: req.params.title}, req.body, {new: true}).then(function(post){
    res.json(post)
  });
});
