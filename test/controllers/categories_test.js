const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const { destroyAllData, categoryFactory } = require('../helpers')


chai.use(chaiHttp);
chai.should();

describe('Categories controller', function () {
  before(async function () {
    await categoryFactory()
  })

  describe('GET /categories', function () {
    it('should list all categories', async function () {
        const { statusCode, body } = await chai.request(app)
        .get('/categories')

        expect(statusCode).to.equal(200)
        expect(body).to.have.property('categories')
        expect(body.categories).to.be.an('array')
        expect(body.categories).to.have.lengthOf(1)

        const category = body.categories[0]

        expect(category).to.have.all.keys(['name', 'picture'])
    })
  })

  after(async function () {
    await destroyAllData()
  })
})