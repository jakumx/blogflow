const express = require('express')
const router = express.Router()
const { Category } = require('../models')
const { listViews } = require('../views/categories')

router.get('/', async function (_req, res, _next) {
  const categories = await Category.findAll({})
  res.status(200).json({ categories: listViews(categories) })
})

module.exports = router
