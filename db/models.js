const mongoose = require('./connection.js')

const PostSchema = mongoose.Schema({
  title: String,
  body: String,
  posted: {type: Date, default: Date.now}
})

const Post = mongoose.model("Post", PostSchema)

module.exports = {
  Post
}
