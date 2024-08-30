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
} else {
	DATABASE = process.env.DATABASE;
}
mongoose
	.connect(DATABASE, { family: 4 })
	.then(() => console.log('DB connected'))
	.catch((err) => console.log(err.message));
