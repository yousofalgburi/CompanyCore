const pool = require('../db/user.js')

const joinTeam = async (req, res) => {
	let { teamCode, email } = req.body

	try {
		let teamResults = await pool.query(
			'SELECT * FROM teams WHERE teamcode = $1',
			[teamCode]
		)

		if (!teamResults?.rows[0]?.teamname)
			return res.status(404).json({ message: "Team doesn't exist" })

		const userResults = await pool.query(
			'UPDATE users SET team = $1 WHERE email = $2 RETURNING *;',
			[teamCode, email]
		)

		if (!userResults?.rows[0]?.user_id)
			return res.status(404).json({ message: 'User does not exist' })

		res.status(200).json({
			teamName: teamResults.rows[0].teamname,
			teamCode: teamResults.rows[0].teamcode,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something went wrong' })
	}
}

const createTeam = async (req, res) => {
	let { teamName, email } = req.body
	let teamCode = 'team' + Math.floor(100000 + Math.random() * 900000)

	try {
		await pool.query(
			'INSERT INTO teams(teamName, teamCode) VALUES($1, $2) RETURNING *;',
			[teamName, teamCode],
			(error, { rows: [{ teamname, teamcode }] }) => {
				if (error) {
					return console.log(error)
				}

				pool.query(
					'UPDATE users SET team = $1, admin = true WHERE email = $2',
					[teamcode, email]
				)

				res.status(201).json({
					teamName: teamname,
					teamCode: teamcode,
				})
			}
		)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Something went wrong' })
	}
}

const leaveTeam = async (req, res) => {
	let { email } = req.body

	try {
		let results = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (!results?.rows[0]?.user_id) {
			return res.status(404).json({ message: 'User does not exist' })
		}

		if (!results?.rows[0]?.team) {
			return res.status(404).json({ message: 'User not in team' })
		}

		await pool.query(
			'UPDATE users SET team = $1, admin = false WHERE email = $2',
			[null, email]
		)

		res.status(201).json()
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log(error)
	}
}

module.exports = {
	createTeam,
	joinTeam,
	leaveTeam,
}
