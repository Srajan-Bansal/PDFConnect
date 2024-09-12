const nodemailer = require('nodemailer');
const htmlTemplate = require('./../public/template/template');
const { client } = require('../redis-client/redis-db');

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = 'Srajan Bansal <srajanbansal999@gmail.com>';
	}

	newTransport() {
		// return nodemailer.createTransport({
		// 	host: process.env.EMAIL_HOST,
		// 	port: process.env.EMAIL_PORT,
		// 	auth: {
		// 		user: process.env.EMAIL_USERNAME,
		// 		pass: process.env.EMAIL_PASSWORD,
		// 	},
		// });
		// return nodemailer.createTransport({
		// 	service: 'gmail',
		// 	auth: {
		// 		user: 'srajanbansal999@gmail.com',
		// 		pass: '9536612782s',
		// 	},
		// });
	}

	async send(template, subject, message = 'welcome') {
		const html = htmlTemplate({
			firstName: this.firstName,
			url: this.url,
			subject: subject + ' ' + this.url,
			message,
		});

		const mailOptions = {
			from: this.from,
			to: this.to,
			subject: subject,
			html,
		};

		// await this.newTransport().sendMail(mailOptions);
		if (process.env.ENVIROMENT === 'production') {
			await client.lPush('mails', JSON.stringify({ mailOptions }));
			try {
				await fetch(process.env.WORKER_URL);
			} catch (error) {
				console.log('Fail to start worker: ', error);
			}
		}
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the PDFConnect!');
	}

	async sendPasswordReset() {
		await this.send(
			'passwordReset',
			'Your password reset token (valid for 10mins)',
			'Forgot your password? Submit a PATCH request with your new password and passwordConfirm'
		);
	}
};
