const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
	points: process.env.SOCKET_RATE_LIMITER,
	duration: process.env.SOCKET_RATE_LIMITER_DURATION,
});

module.exports = (io) => {
	io.on('connection', async (socket) => {
		try {
			await rateLimiter.consume(socket.handshake.address);

			socket.on('join-document', (documentID) => {
				// Leave any previous rooms
				Object.keys(socket.rooms).forEach((room) => {
					if (room !== socket.id) {
						socket.leave(room);
					}
				});

				socket.join(documentID);
				socket.to(documentID).emit('user-joined', socket.id);
			});

			socket.on('send-changes', ({ documentID, delta, isExtracted }) => {
				if (!socket.rooms.has(documentID)) {
					socket.join(documentID);
				}
				socket.broadcast
					.to(documentID)
					.emit('receive-changes', { delta, isExtracted });
			});

			socket.on('disconnect', () => {
				socket.to(socket.id).emit('user-left', socket.id);
				console.log(`User ${socket.id} disconnected`);
			});
		} catch (error) {
			console.log('Error in socket connection: ', error);
		}
	});
};
