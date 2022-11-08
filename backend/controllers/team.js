const pool = require('../db/user.js')

const joinTeam = async (req, res) => {
	let { teamCode, email } = req.body

	try {
		let { rows } = await pool.query('SELECT * FROM teams WHERE teamcode = $1', [
			teamCode,
		])

		if (!rows[0]?.teamname)
			return res.status(404).json({ message: "Team doesn't exist" })

		let results = await pool.query('SELECT * FROM users WHERE email = $1', [
			email,
		])

		if (!results?.rows[0]?.user_id) {
			return res.status(404).json({ message: 'User does not exist' })
		}

		let teamInfo = await pool.query('SELECT * FROM teams WHERE teamcode = $1', [
			teamCode,
		])

		await pool.query('UPDATE users SET team = $1 WHERE user_id = $2', [
			teamCode,
			results?.rows[0]?.user_id,
		])

		res.status(200).json({
			result: {
				team: {
					teamName: teamInfo.rows[0].teamname,
					teamCode: teamInfo.rows[0].teamcode,
				},
			},
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
			(error, results) => {
				if (error) {
					return console.log(error)
				}

				pool.query(
					'UPDATE users SET team = $1 WHERE email = $2',
					[results.rows[0].teamcode, email],
					(error, results) => {
						if (error) {
							return console.log(error)
						}
					}
				)

				res.status(201).json({
					teamName: results.rows[0].teamname,
					teamCode: results.rows[0].teamcode,
				})
			}
		)
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
		console.log(error)
	}
}

const leaveTeam = async (req, res) => {
	let { email } = req.body

	try {
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
