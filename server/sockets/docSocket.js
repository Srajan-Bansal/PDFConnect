const { RateLimiterMemory } = require('rate-limiter-flexible');
const Doc = require('../models/docsModel');

const findOrCreateDocument = async (id) => {
	try {
		if (!id) return;

		let document = await Doc.findOne({ uuid: id });
		if (!document) {
			document = await Doc.create({ uuid: id, data: '' });
		}
		return document;
	} catch (error) {
		console.error('Error finding or creating document:', error);
		throw new Error(error);
	}
};

const saveDocument = async (id, data) => {
	try {
		const doc = await Doc.findOne({ uuid: id });
		doc.data = data;
		await doc.save();
	} catch (err) {
		console.log('Error saving document', err);
		throw new Error(err);
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

			socket.on('get-document', async (documentID) => {
				const document = await findOrCreateDocument(documentID);
				socket.join(documentID);
				socket.emit('load-document', document.data);

				socket.on('send-changes', ({ delta, isExtracted }) => {
					socket.broadcast
						.to(documentID)
						.emit('receive-changes', { delta, isExtracted });
				});

				socket.on('save-document', async (data) => {
					await saveDocument(documentID, data);
				});
			});
		} catch (error) {
			console.log('Error loading document: ', error);
		}
	});
};
