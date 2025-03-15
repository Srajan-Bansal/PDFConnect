const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const protect = require('./middleware/protect');

dotenv.config({ path: './config.env' });
const app = require('./app');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: true,
		methods: ['GET', 'POST'],
		credentials: true,
	},
	// Add these configuration options for better reliability
	pingTimeout: 60000, // How long to wait for a ping response
	pingInterval: 25000, // How often to ping the client
	connectTimeout: 20000, // Connection timeout
	reconnection: true, // Allow reconnection
	reconnectionAttempts: 5, // Number of reconnection attempts
	reconnectionDelay: 1000, // Initial delay between reconnection attempts
	reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
});

app.use(protect);
const docIO = io.of('/document');
require('./sockets/docSocket')(docIO);

const chatIO = io.of('/chat');
require('./sockets/chatSocket')(chatIO);

const PORT = process.env.PORT || 8000;
httpServer.listen(PORT, () => {
	console.log(`Server listening on PORT ${PORT}`);
});

let DATABASE;
if (process.env.ENVIROMENT === 'development') {
	DATABASE = process.env.DATABASE_LOCAL;
} else if (process.env.ENVIROMENT === 'docker-run') {
	DATABASE = process.env.DATABASE_DOCKER;
} else {
	DATABASE = process.env.DATABASE;
}
DATABASE = process.env.DATABASE;
mongoose
	.connect(DATABASE, { family: 4 })
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(err.message));
