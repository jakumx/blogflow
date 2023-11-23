const expect = require('chai').expect
const models = require('../../models')
const { User, Category, Post } = models

describe('Post model', function () {
    let user, category
    before(async function () {
      user = await User.create({
        name: 'some name',
        sub: 'some value',
        email: 'example@email.com',
        picture: 'some value',
        credential: 'some value'
      })

      category = await Category.create({
        name: 'some name',
        imageUrl: 'some value'
      })
    })

    it('should create a Post and find it', async function () {
      const findZeroPosts = await Post.findAll()

      expect(findZeroPosts).to.be.an('array')
      expect(findZeroPosts).to.have.lengthOf(0)

      await Post.create({
        title: 'some value',
        content: 'some value',
        UserId: user.id,
        CategoryId: category.id
      })
      
      const posts = await Post.findAll()

      expect(posts).to.be.an('array')
      expect(posts).to.have.lengthOf(1)
    })

    after(async function () {
      await Post.destroy({ where: { } })
      await Category.destroy({ where: { } })
      await User.destroy({ where: { } })
    })
})