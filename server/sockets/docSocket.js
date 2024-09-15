const { RateLimiterMemory } = require('rate-limiter-flexible');
const { saveDocument } = require('../controller/docController');

const rateLimiter = new RateLimiterMemory({
	points: process.env.SOCKET_RATE_LIMITER,
	duration: process.env.SOCKET_RATE_LIMITER_DURATION,
});

module.exports = (io) => {
	io.on('connection', async (socket) => {
		try {
			await rateLimiter.consume(socket.handshake.address);

			socket.on('send-changes', ({ documentID, delta, isExtracted }) => {
				socket.join(documentID);
				socket.broadcast
					.to(documentID)
					.emit('receive-changes', { delta, isExtracted });
			});

			socket.on('save-document', async ({ documentID, data }) => {
				try {
					await saveDocument(documentID, data);
				} catch (err) {
					console.error('Error saving document:', err);
					socket.emit('error', 'Error saving document');
				}
			});
		} catch (error) {
			console.log('Error in socket connection: ', error);
		}
	});
};
