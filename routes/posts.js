const express = require('express')
const router = express.Router()

router.get('/', function (_req, res, _next) {
  res.status(200)
  res.json({ page: 'GET posts' })
})

router.get('/:id', function (_req, res, _next) {
  res.status(200)
  res.json({ page: 'GET posts id' })
})

router.post('/', function (_req, res, _next) {
  res.status(200)
  res.json({ page: 'POST posts' })
})

router.delete('/:id', function (_req, res, _next) {
  res.status(200)
  res.json({ page: 'POST users' })
})

module.exports = router
