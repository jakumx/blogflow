

const expect = require('chai').expect
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../app')
const { destroyAllData, postFactory } = require('../helpers')
const { User } = require('../../models')
const credential = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlNzJkYTFkZjUwMWNhNmY3NTZiZjEwM2ZkN2M3MjAyOTQ3NzI1MDYiLCJ0eXAiOiJKV1QifQ.eyAiaXNzIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsICJhenAiOiAiMTIzNDU2Nzg5MDEyMy0xMjM0NTY3ODg4dnNuYXY3cWdvaW9xdXZhYmNkZWZnai5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsICJhdWQiOiAiOTEyMzQ1Njc4OTAxMi0xMjM0NTY3ODg4N3ZzbmF2N3Fnb2lvcXV2YWJjZGVmZ2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCAic3ViIjogIjEyMzQ1NjE3ODk4ODc2NTQzMjEyMyIsICJlbWFpbCI6ICJleGFtcGxlQG1haWwuY29tIiwgImVtYWlsX3ZlcmlmaWVkIjogdHJ1ZSwgIm5iZiI6IDEyMzQ1NDY3ODksICJuYW1lIjogImpvbmggZG9lIiwgInBpY3R1cmUiOiAiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTEtFbGk5UmdhYUVHN2RzbWxUSEQ1cElQMUEzOU5YU2xZNDhSUFZmTDRGM1VrPXM5Ni1jIiwgImdpdmVuX25hbWUiOiAiam9uaCIsICJmYW1pbHlfbmFtZSI6ICJkb2UiLCAibG9jYWxlIjogImVzIiwgImlhdCI6IDE3MDA3NDcwNTYsICJleHAiOiAxNzAwNzUwNjU2LCAianRpIjogIjEyMzRkZTM1MDZmMTIzNDFkYjYyMTIzNGUzMWMyNDIyNjAiIH0=.e4AxEjLjkK_aYwHYVM8LzlLEYxdbousmuyKlcMhqjfHTm-L-oTKVNRA52AdG_urKAwPjfHs3DLDqLV9o0yrmPPRifyn7HtFvjW4L_5dP4DasfESM_PU6NPs0tVDB7Mt6NGDdyQLBCCRe832BEpuT9aXupKdWV2KSmMdbUkJr-FclFP41KUNwB6mfOiNjYh46GRxkxeWZJuu3VW3cAnlOTICAagcNz5VdVNfqlLBG6MkrIuJfMO83kuC5GazKEph2yxF7RBTG-wPxDJIqCYnwa7PS__MgIrVLQIOLD5yux-6ylgxuy1eRRHMU6Zo8JN7msN-rXU5U2ouObJ6C5DWYdA'

chai.use(chaiHttp);
chai.should();

describe('Users controller', function () {
  let postData
  before(async function () {
    postData = await postFactory()
  })

  describe('POST /users', function () {
    it('should create info or update of a user', async function () {
      const { statusCode, body } = await chai.request(app)
      .post('/users').send({ credential })
      
      expect(statusCode).to.equal(201)
      expect(body).to.have.property('user')
      expect(body.user).to.have.all.keys(['name', 'sub', 'email', 'picture'])
    })
  })

  describe('GET /users/posts', function () {
    it('should return all post from users', async function () {
      const user = await User.findByPk(postData.UserId)

      const { statusCode, body } = await chai.request(app)
      .get('/users/posts')
      .set('token', user.sub)
      
      expect(statusCode).to.equal(200)
      expect(body).to.have.property('posts')
      expect(body.posts).to.have.lengthOf(1)
    })
  })

  after(async function () {
    await destroyAllData()
  })
})