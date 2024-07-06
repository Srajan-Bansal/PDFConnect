const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'Srajan Bansal <srajanbansal999@gmail.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
		// html:
	};

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
