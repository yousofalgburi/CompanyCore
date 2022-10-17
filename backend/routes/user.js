const express = require('express')
const router = express.Router()
const { signin, signup } = require('../controllers/auth.controllers')

router.post('/register', signup, (req, res) => {})

router.post('/login', signin, (req, res) => {})

module.exports = router
