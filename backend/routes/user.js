const express = require('express')
const { signin, register, verifyEmail } = require('../controllers/user.js')
const router = express.Router()

router.post('/signin', signin)
router.post('/register', register)
router.get('/confirmation/:token', verifyEmail)

module.exports = router
