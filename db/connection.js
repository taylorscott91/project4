const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog_db', (err) => {
  if(err){
    console.log(err)
  } else{
    console.log("make some posts")
  }
})

module.exports = mongoose
