const { createClient } = require('redis');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const redis_url = {
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
};

const client = createClient(redis_url);

client.on('error', (err) => console.log('Redis Client Error: ', err));

client
	.connect()
	.then(() => {
		console.log('Redis Client Connected');
		main();
	})
	.catch((err) => console.log('Redis Connection Error:', err));

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},
});

async function main() {
	while (true) {
		try {
			const value = await client.brPop('mails', 0);

			if (value) {
				const { mailOptions } = JSON.parse(value.element);
				await transport.sendMail(mailOptions);
				console.log('Mail sent');
			}
		} catch (err) {
			console.log('Error:', err);
		}
	}
}
