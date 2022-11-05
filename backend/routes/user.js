const express = require('express')
const { signin, register } = require('../controllers/user.js')
const router = express.Router()

router.post('/signin', signin)
router.post('/register', register)

module.exports = router
