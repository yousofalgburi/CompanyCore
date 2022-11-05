const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')
const cors = require('cors')

const user = require('./routes/user.js')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/auth', user)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
