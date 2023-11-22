const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/:id', function (_req, res, _next) {
  res.status(200)
  res.json({ page: 'GET users'})
})

router.post('/', function (_req, res, _next) {
  res.status(201)
  res.json({ page: 'POST users'})
})

module.exports = router
