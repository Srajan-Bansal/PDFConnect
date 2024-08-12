const mongoose = require('mongoose');
const Chat = require('./../models/chatModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.findMessagesByUser = catchAsync(async (req, res, next) => {
	const userId = req.body.userId;
	if (!mongoose.Types.ObjectId.isValid(userId)) {
		return next(new AppError('Invalid user ID', 400));
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
});
