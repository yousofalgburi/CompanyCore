const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/user.js')
const secret = process.env.SECERT || 'test'

const signin = async (req, res) => {
	const { email, password } = req.body

	try {
		let { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (!rows[0]?.email)
			return res.status(404).json({ message: "User doesn't exist" })

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

		res.status(200).json({ result: rows[0].email, token })
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}

const register = async (req, res) => {
	const { name, email, password } = req.body

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

				result = `User added id: ${results.rows[0].user_id} email: ${results.rows[0].email} name: ${results.rows[0].name} password: ${results.rows[0].password}`
				res.status(201).json({ result, token })
			}
		)
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log(error)
	}
}

module.exports = {
	signin,
	register,
}
