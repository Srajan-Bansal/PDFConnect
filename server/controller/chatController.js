const Chat = require('./../models/chatModel');
const mongoose = require('mongoose'); // Ensure mongoose is imported

exports.findMessagesByUser = async (req, res, next) => {
	try {
		const userId = req.body.userId;
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(400).send('Invalid user ID');
		}

		const chats = await Chat.find({ 'messages.senderId': userId })
			.populate({
				path: 'messages.senderId',
				select: 'name',
				model: 'User',
			})
			.exec();

		// const userMessages = chats.flatMap((chat) =>
		// 	chat.messages.filter(
		// 		(message) => message.senderId.toString() === userId
		// 	)
		// );

		// if (userMessages.length === 0) {
		// 	return res.status(404).send('No messages found for this user');
		// }

		res.status(200).json(chats);
	} catch (error) {
		console.error('Error finding messages by user:', error);
		res.status(500).send('Error finding messages by user');
	}
};
