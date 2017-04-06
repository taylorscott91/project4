const Post = require('./models.js').Post
const seedData = require('./seedData')

Post.remove({}, () => {
  Post.create(seedData, () => {
    process.exit()
  })
})
