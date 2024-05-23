const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const protect = require('./Middleware/protect');

dotenv.config({ path: './config.env' });
const app = require('./app');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: process.env.CLIENT_URL_MOBILE,
		methods: ['GET', 'POST'],
	},
});

app.use(protect);
const docIO = io.of('/document');
require('./sockets/docSocket')(docIO);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`);
});

mongoose
	.connect(process.env.DATABASE_LOCAL, { family: 4 })
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(err.message));
