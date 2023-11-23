const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { singleView } = require('../views/users')

router.post('/', async function (req, res, _next) {
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

module.exports = router
