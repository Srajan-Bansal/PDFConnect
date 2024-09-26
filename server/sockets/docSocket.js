const { RateLimiterMemory } = require('rate-limiter-flexible');

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
		} catch (error) {
			console.log('Error in socket connection: ', error);
		}
	});
};
