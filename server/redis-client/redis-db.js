const { createClient } = require('redis');

const redis_url = {
	password: process.env.REDIS_PASSWORD,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
};

let client = '';
if (process.env.ENVIROMENT === 'production') {
	client = createClient(redis_url);

	client.on('error', (err) => console.log('Redis Client Error: ', err));

	client
		.connect()
		.then(() => console.log('Redis Client Connected'))
		.catch((err) => console.log('Redis Connection Error:', err));
}

module.exports = { client };
