const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const user = require('../models/user')

exports.signup = (req, res) => {
	const { name, email, password } = req.body
	const user = new User({
		name: name,
		email: email,
		password: bcrypt.hashSync(password, 8),
	})

	user.save((err, user) => {
		if (err) {
			return res.status(500).send({ message: err })
		} else {
			res.status(200).send({ message: 'user created' })
		}
	})
}

exports.signin = (req, res) => {
	const { email, password } = req.body

	User.findOne({
		email: email,
	}).exec((err, user) => {
		if (err) {
			return res.status(500).send({ message: err })
		}

		if (!user) {
			return res.status(404).send({ message: 'user not found' })
		}

		let passwordIsValid = bcrypt.compareSync(password, user.password)

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'password wrong',
			})
		}

		let token = jwt.sign(
			{
				id: user.id,
			},
			process.env.API_SECERT || 'secert',
			{
				expiresIn: 86400,
			}
		)

		res.status(200).send({
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
			},
			message: 'login success',
			accessToken: token,
		})
	})
}
