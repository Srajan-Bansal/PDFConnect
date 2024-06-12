module.exports = (io) => {
	io.on('connection', async () => {
		console.log('video socket');
	});
};
