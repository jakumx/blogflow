const expect = require('chai').expect
const models = require('../models')
const Category = models.Category

describe('Category model', function () {
    it('should create a category and find it', async function () {
      const findZeroCategory = await Category.findAll()

      expect(findZeroCategory).to.be.an('array')
      expect(findZeroCategory).to.have.lengthOf(0)

      await Category.create({
        name: 'some name',
        imageUrl: 'some value'
      })

      const categories = await Category.findAll()

      expect(categories).to.be.an('array')
      expect(categories).to.have.lengthOf(1)
    })

    after(async function () {
      await Category.destroy({ where: { } })
    })
})