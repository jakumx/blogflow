const express = require('express')
const router = express.Router()
const { User, Post } = require('../models')
const { singleView } = require('../views/users')
const { listViews } = require('../views/posts')

router.post('/', async function (req, res) {
  const { credential } = req.body
  const credentialSplited = credential.split('.')
  const data = JSON.parse(atob(credentialSplited[1]))

  const [user] = await User.findOrCreate({
    where: {
      email: data.email
    },
    defaults: {
      name: data.name,
      sub: data.sub,
      email: data.email,
      picture: data.picture
    }
  })

  res.status(201)
  res.json({ user: singleView(user) })
})

router.get('/posts', async function (req, res) {
  if (!req.headers.token) {
    res.status(200).json({ posts: [] })
    return
  }
  const posts = await Post.findAll({
    where: {
      '$User.sub$': req.headers.token
    },
    include: ['User', 'Category']
  })
  res.status(200).json({ posts: listViews(posts) })
})

module.exports = router
