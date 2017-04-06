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

app.get("/api/posts/:name", function(req, res){
  Post.findOne({name: req.params.name}).then(function(post){
    res.json(post)
  });
});

app.post("/api/posts", function(req, res){
  Post.create(req.body).then(function(post){
    res.json(post)
  })
});

app.delete("/api/posts/:name", function(req, res){
  Post.findOneAndRemove({name: req.params.name}).then(function(){
    res.json({ success: true })
  });
});

app.put("/api/posts/:name", function(req, res){
  Post.findOneAndUpdate({name: req.params.name}, req.body, {new: true}).then(function(post){
    res.json(post)
  });
});
