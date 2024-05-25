const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
	_id: String,
	messages: [
		{
			senderId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				default: '',
			},
			timestamp: Date,
		},
	],
});

// chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 21600 });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
