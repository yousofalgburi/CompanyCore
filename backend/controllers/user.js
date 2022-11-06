const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/user.js')
const secret = process.env.SECERT || 'test'
const sendEmail = require('../utils/email')

const signin = async (req, res) => {
	let { email, password } = req.body

	email = email.toLowerCase()

	try {
		let { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (!rows[0]?.email)
			return res.status(404).json({ message: "User doesn't exist" })

		if (!rows[0]?.verified)
			return res.status(404).json({
				message:
					'User is not verified, please check your email to verify your account.',
			})

		const isPasswordCorrect = await bcrypt.compare(password, rows[0].password)

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials' })

		const token = jwt.sign(
			{ email: rows[0].email, user_id: rows[0].user_id },
			secret,
			{
				expiresIn: '1h',
			}
		)

		res
			.status(200)
			.json({ result: { name: rows[0].name, email: rows[0].email }, token })
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}

const register = async (req, res) => {
	let { name, email, password } = req.body

	email = email.toLowerCase()

	try {
		let { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (rows[0]?.email)
			return res.status(400).json({ message: 'User already exists' })

		const hashedPassword = await bcrypt.hash(password, 12)

		await pool.query(
			'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *;',
			[name, email, hashedPassword],
			(error, results) => {
				if (error) {
					return console.log(error)
				}

				const token = jwt.sign(
					{ email: results.rows[0].email, user_id: results.rows[0].user_id },
					secret,
					{
						expiresIn: '1h',
					}
				)

				jwt.sign(
					{ user: results.rows[0]?.user_id },
					process.env.EMAIL_SECERT,
					{ expiresIn: '1d' },
					(err, emailToken) => {
						const url = process.env.BASE_URL + 'auth/confirmation/' + emailToken

						sendEmail(
							results.rows[0].email,
							'Email Verification',
							`
								<p>Please verify your email using this link: </p>
								<br>
								<a href="${url}" target="_blank">Link</a>
							`
						)
					}
				)

				result = `User added with email: ${results.rows[0].email}`
				res.status(201).json({ result, token })
			}
		)
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log(error)
	}
}

const verifyEmail = async (req, res) => {
	try {
		const { user: user_id } = jwt.verify(
			req.params.token,
			process.env.EMAIL_SECERT
		)

		await pool.query(
			'SELECT verified FROM users WHERE user_id = $1',
			[user_id],
			(error, results) => {
				const { verified } = results.rows[0]

				if (verified) {
					return res.status(201).json('user already verified')
				} else {
					pool.query('UPDATE users SET verified = true WHERE user_id = $1', [
						user_id,
					])

					return res.status(201).json('verified')
				}
			}
		)
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log('error: ' + error.message)
	}
}

module.exports = {
	signin,
	register,
	verifyEmail,
}
