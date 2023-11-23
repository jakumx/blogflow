const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../../app')
const { destroyAllData, postFactory } = require('../helpers')
const { Post } = require('../../models')
chai.use(chaiHttp);
chai.should();

describe('Post controller', function () {
  let postData
  beforeEach(async function () {
    postData = await postFactory()
  })

  describe('GET /posts', function () {
    it('should return all posts', async function () {
        const { statusCode, body } = await chai.request(app)
        .get('/posts')

        expect(statusCode).to.equal(200)
        expect(body).to.have.property('posts')
        expect(body.posts).to.be.an('array')
        expect(body.posts).to.have.lengthOf(1)
        
        const post = body.posts[0]

        expect(post).to.have.all.keys(['id', 'title', 'content', 'createdAt', 'author', 'category'])
        expect(post.author).to.have.all.keys(['name', 'picture'])
        expect(post.category).to.have.all.keys(['name', 'picture'])
    })
  })

  describe('GET /posts with filters', function () {
    it('should return posts with title filter', async function () {
      const { statusCode, body } = await chai.request(app)
        .get('/posts')
        .query({ filter: 'title'})

        expect(statusCode).to.equal(200)
        expect(body.posts).to.have.lengthOf(1)

        const post = body.posts[0]

        expect(post.title).to.match(/title$/)
        expect(post.content).to.not.match(/title$/)
        expect(post.category.name).to.not.match(/title$/)
    })

    it('should return posts with content filter', async function () {
      const { statusCode, body } = await chai.request(app)
        .get('/posts')
        .query({ filter: 'content'})

        expect(statusCode).to.equal(200)
        expect(body.posts).to.have.lengthOf(1)

        const post = body.posts[0]

        expect(post.title).to.not.match(/content$/)
        expect(post.content).to.match(/content$/)
        expect(post.category.name).to.not.match(/content$/)
    })

    it('should return posts with author filter', async function () {
      const { statusCode, body } = await chai.request(app)
        .get('/posts')
        .query({ filter: 'category'})

        expect(statusCode).to.equal(200)
        expect(body.posts).to.have.lengthOf(1)

        const post = body.posts[0]

        expect(post.title).to.not.match(/^category/)
        expect(post.content).to.not.match(/^category/)
        expect(post.category.name).to.match(/^category/)
    })

    after(async function () {
      await destroyAllData()
    })
  })

  describe('GET /posts/:id', function () {
    it('should return post by id', async function () {
      const { statusCode: bodyStatusCode, body: emptyBody } = await chai.request(app)
        .get('/posts/1')

        expect(bodyStatusCode).to.equal(200)
        expect(emptyBody).to.have.property('post')
        expect(emptyBody.post).to.be.null

        const { statusCode, body } = await chai.request(app)
        .get(`/posts/${postData.id}`)

        expect(statusCode).to.equal(200)
        expect(body).to.have.property('post')
        expect(body.post).to.be.an('object').that.is.not.empty
    })
  })

  describe('POST /posts', function () {
    it('should fail incompleted data', async function () {
      const { statusCode, error } = await chai.request(app)
        .post('/posts')
        .send({})

      expect(statusCode).to.equal(400)
      expect(error.text).to.equal('Bad request')
    })

    it('should fail no userId found', async function () {
      const { statusCode, error } = await chai.request(app)
        .post('/posts')
        .send({
          title: 'some value',
          content: 'some content',
          userId: 1,
          categoryId: 2
        })

      expect(statusCode).to.equal(400)
      expect(error.text).to.equal('Invalid userId')
    })

    it('should fail no categoryId found', async function () {
      const { statusCode, error } = await chai.request(app)
        .post('/posts')
        .send({
          title: 'some value',
          content: 'some content',
          userId: postData.UserId,
          categoryId: 2
        })

      expect(statusCode).to.equal(400)
      expect(error.text).to.equal('Invalid categoryId')
    })

    it('should return status created', async function () {
      const resp = await chai.request(app)
      .post('/posts')
      .send({
        title: 'some value',
        content: 'some content',
        userId: postData.UserId,
        categoryId: postData.CategoryId
      })
    
      expect(resp.statusCode).to.equal(201)

      const posts = await Post.findAll()

      expect(posts).to.have.lengthOf(2)
    })
  })

  describe('DELETE /posts/:id', function () {
    it('should return 200', async function () {
      const { statusCode: bodyStatusCode } = await chai.request(app)
        .delete('/posts/1')

      expect(bodyStatusCode).to.equal(200)
    
      const noDeletedPosts = await Post.findAll()
      
      expect(noDeletedPosts).to.have.lengthOf(1)

      const { statusCode } = await chai.request(app)
      .delete(`/posts/${postData.id}`)
    
      expect(statusCode).to.equal(200)

      const posts = await Post.findAll()

      expect(posts).to.have.lengthOf(0)
    })
  })

  afterEach(async function () {
    await destroyAllData()
  })
})