const { RateLimiterMemory } = require('rate-limiter-flexible');
const Doc = require('../models/docsModel');

const findOrCreateDocument = async (id) => {
	try {
		if (!id) return;

		let document = await Doc.findById(id);
		if (!document) {
			document = await Doc.create({ _id: id, data: '' });
		}
		return document;
	} catch (error) {
		console.error('Error finding or creating document:', error);
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
			console.log('Socket connected', socket.id);

			socket.on('get-document', async (documentID) => {
				const document = await findOrCreateDocument(documentID);
				socket.join(documentID);
				socket.emit('load-document', document.data);

				socket.on('send-changes', (delta) => {
					socket.broadcast
						.to(documentID)
						.emit('receive-changes', delta);
				});

				socket.on('save-document', async (data) => {
					await Doc.findByIdAndUpdate(documentID, {
						data,
						createdAt: new Date(),
					});
				});
			});
		} catch (error) {
			console.log('Error loading document: ', error);
		}
	});
};
