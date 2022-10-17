const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name not provided.'],
	},
	email: {
		type: String,
		unique: [true, 'email already exists in the database!'],
		lowercase: true,
		trim: true,
		required: [true, 'email is required.'],
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
			},
			message: '{VALUE} is not a valid email!',
		},
	},
	password: {
		type: String,
		required: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('User', userSchema)
