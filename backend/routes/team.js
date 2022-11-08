const express = require('express')
const { createTeam, joinTeam, leaveTeam } = require('../controllers/team.js')
const router = express.Router()

router.post('/createTeam', createTeam)
router.post('/joinTeam', joinTeam)
router.post('/leaveTeam', leaveTeam)

module.exports = router
