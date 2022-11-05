const nodemailer = require('nodemailer')

const sendEmail = async (email, subject, html) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		})

		await transporter.sendMail({
			to: email,
			subject: subject,
			html: html,
		})
	} catch (error) {
		console.log('email not sent')
		console.log(error)
	}
}

module.exports = sendEmail
