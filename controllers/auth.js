const { User } = require('../models')

const verifyAuth = async (req, res, next) => {
  if (!req.headers.token) {
    res.status(403).send('Unauthorized')
    return
  }

  const user = await User.findOne({
    where: {
      sub: req.headers.token
    }
  })

  if (!user) {
    res.status(403).send('Unauthorized')
    return
  }
  next()
}

module.exports = verifyAuth
