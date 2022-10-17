const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

require('dotenv').config()

try {
	mongoose.connect('mongodb://localhost:27017/usersdb', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	console.log('connected to db')
} catch (error) {
	console.log(error)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoutes)

app.listen(process.env.port || 8080, () => {
	console.log('listening')
})
