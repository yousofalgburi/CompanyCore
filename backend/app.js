const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')

const user = require('./routes/user.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/auth', user)

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
