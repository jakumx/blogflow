const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()
const { Post, User, Category } = require('../models')
const { listViews, singleView } = require('../views/posts')

router.get('/', async function (req, res, _next) {
  const whereData = { where: {} }

  if (req?.query?.filter) {
    const filter = req.query.filter
    whereData.where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: filter
          }
        }, {
          content: {
            [Op.substring]: filter
          }
        }, {
          '$Category.name$': {
            [Op.substring]: filter
          }
        }
      ]
    }
  }

  const posts = await Post.findAll({
    ...whereData,
    include: ['User', 'Category']
  })

  res.status(200).json({ posts: listViews(posts) })
})

router.get('/:id', async function (req, res, _next) {
  const post = await Post.findOne({
    where: {
      id: req.params.id
    },
    include: ['User', 'Category']
  })

  res.status(200).json({ post: singleView(post) })
})

router.post('/', async function (req, res, _next) {
  const { title = null, content = null, userId = null, categoryId = null } = req.body

  if (!title || !content || !userId || !categoryId) {
    res.status(400).send('Bad request')
    return
  }

  const user = await User.findByPk(userId)

  if (!user) {
    res.status(400).send('Invalid userId')
    return
  }

  const category = await Category.findByPk(categoryId)

  if (!category) {
    res.status(400).send('Invalid categoryId')
    return
  }

  await Post.create({
    title,
    content,
    UserId: userId,
    CategoryId: categoryId
  })

  res.status(201).send('created')
})

router.delete('/:id', async function (req, res, _next) {
  await Post.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).send('OK')
})

module.exports = router
