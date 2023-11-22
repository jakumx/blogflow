const expect = require('chai').expect
const models = require('../models')
const User = models.User

describe('User model', function () {
    it('should create a user and find it', async function () {
      const findZeroUsers = await User.findAll()

      expect(findZeroUsers).to.be.an('array')
      expect(findZeroUsers).to.have.lengthOf(0)

      await User.create({
        name: 'some name',
        sub: 'some value',
        email: 'example@email.com',
        picture: 'some value',
        credential: 'some value'
      })

      const users = await User.findAll()

      expect(users).to.be.an('array')
      expect(users).to.have.lengthOf(1)
    })

    after(async function () {
      await User.destroy({ where: { } })
    })
})