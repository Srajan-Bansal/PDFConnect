const { RateLimiterMemory } = require('rate-limiter-flexible');
const { getAllChats, saveMessages } = require('./../controller/chatController');

const rateLimiter = new RateLimiterMemory({
	points: process.env.SOCKET_RATE_LIMITER,
	duration: process.env.SOCKET_RATE_LIMITER_DURATION,
});

module.exports = (io) => {
	io.on('connection', async (socket) => {
		try {
			await rateLimiter.consume(socket.handshake.address);

			socket.on('get-messages', async (documentID) => {
				const chats = await getAllChats(documentID);
				socket.join(documentID);
				socket.emit('load-messages', chats);
			});

			socket.on('save-message-batch', async ({ message, documentID }) => {
				await saveMessages({ message, documentID });
			});

			socket.on('send-message', async ({ message, documentID }) => {
				socket.broadcast
					.to(documentID)
					.emit('receive-message', message);
			});
		} catch (error) {
			console.log('Error handling Chat socket connection: ', error);
		}
	});
};
