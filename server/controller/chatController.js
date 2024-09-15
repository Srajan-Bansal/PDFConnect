const Doc = require('./../models/docsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllChats = catchAsync(async (documentID) => {
	const docs = await Doc.findOne({ uuid: documentID });

	if (!docs) {
		return next(new AppError('No documents found', 404));
	}

	const chats = docs.chatMessages || [];
	return chats;
});

exports.saveMessages = catchAsync(async ({ message, documentID }) => {
	const doc = await Doc.findOne({ uuid: documentID });
	if (!doc) {
		return next(new AppError('Document does not exist', 404));
	}
	doc.chatMessages.push(message);
	await doc.save();
});
