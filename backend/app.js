const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const user = require('./routes/user.js')
const team = require('./routes/team.js')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/auth', user)
app.use('/team', team)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
