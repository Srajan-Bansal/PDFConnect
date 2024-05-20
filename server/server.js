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
		origin: process.env.CLIENT_URL,
		methods: ['GET', 'POST'],
	},
});

app.use(protect);
const docIO = io.of('/document');
require('./sockets/docSocket')(docIO);

const APP_PORT = process.env.APP_PORT || 3000;
httpServer.listen(APP_PORT, () => {
	console.log(`Server listening on PORT ${APP_PORT}`);
});

mongoose
	.connect(process.env.DATABASE_LOCAL, { family: 4 })
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(err.message));

// for chatting and video calling
// const SOCKET_PORT = process.env.SOCKET_PORT || 8080;
// httpServer.listen(SOCKET_PORT, () => {
// 	console.log(`Socket server listing on PORT ${SOCKET_PORT}`);
// });
