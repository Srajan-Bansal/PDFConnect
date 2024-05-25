const { RateLimiterMemory } = require('rate-limiter-flexible');
const Chat = require('./../models/chatModel');

const findOrCreateChat = async (id) => {
	try {
		if (!id) return;

		let chat = await Chat.findById(id);
		if (!chat) {
			chat = await Chat.create({ _id: id, message: [] });
		}
		return chat;
	} catch (error) {
		console.error('Error finding or creating chat:', error);
		throw new Error(error);
	}
};

const rateLimiter = new RateLimiterMemory({
	points: process.env.SOCKET_RATE_LIMITER,
	duration: process.env.SOCKET_RATE_LIMITER_DURATION,
});

module.exports = (io) => {
	io.on('connection', async (socket) => {
		try {
			await rateLimiter.consume(socket.handshake.address);
			console.log('Socket connected to Chat', socket.id);

			socket.on('get-messages', async (documentID) => {
				const chat = await findOrCreateChat(documentID);
				socket.join(documentID);
				socket.emit('load-messages', chat.messages);
			});

			socket.on('send-message', async ({ message, documentID }) => {
				const chat = await Chat.findById(documentID);
				// console.log(message);
				chat.messages.push(message);
				await chat.save();
				socket.broadcast
					.to(documentID)
					.emit('receive-message', message);
			});
		} catch (error) {
			console.log('Error handling Chat socket connection: ', error);
		}
	});
};
