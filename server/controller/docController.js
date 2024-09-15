const { v4: uuidv4 } = require('uuid');
const Doc = require('./../models/docsModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { faker } = require('@faker-js/faker');

const generateFunnyName = () => {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();
	return `${firstName} ${lastName}`;
};

exports.createDoc = catchAsync(async (req, res, next) => {
	const Docs = await Doc.find({ creator: req.user.id });
	if (Docs.length >= 7) {
		return next(new AppError('Document limit reached', 400));
	}

	const title = generateFunnyName();

	const newDoc = await Doc.create({
		uuid: uuidv4(),
		title,
		creator: req.user.id,
		participants: [req.user.id],
	});

	if (!newDoc) {
		return next(new AppError('Document not created', 400));
	}

	const populatedDoc = await Doc.findOne({ uuid: newDoc.uuid })
		.populate('creator', 'name')
		.select('-data -chatMessages -__v -_id');

	const data = {
		uuid: populatedDoc.uuid,
		title: populatedDoc.title,
		creator: populatedDoc.creator.name,
		participants: populatedDoc.participants,
		createdAt: populatedDoc.createdAt,
		updatedAt: populatedDoc.updatedAt,
	};

	res.status(201).json(data);
});

exports.getUserDocs = catchAsync(async (req, res, next) => {
	const docs = await Doc.find({ participants: req.user.id })
		.populate('creator', 'name')
		.populate('participants', 'name email')
		.select('-data -chatMessages -__v -_id');

	if (!docs.length) {
		return res.status(200).json(docs);
	}

	const data = docs.map((doc) => ({
		uuid: doc.uuid,
		title: doc.title,
		creator: doc.creator ? doc.creator.name : 'Unknown',
		participants: doc.participants.map((participant) => ({
			name: participant.name,
			email: participant.email,
		})),
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
	}));

	res.status(200).json(data);
});

exports.accessDoc = catchAsync(async (req, res, next) => {
	const { docId } = req.params;

	if (!docId) {
		return next(new AppError('Document ID is required', 400));
	}

	const doc = await Doc.findOne({ uuid: docId }).populate('creator');

	if (!doc) {
		return next(new AppError('Document does not exist', 404));
	}

	if (
		doc.creator.toString() === req.user.id ||
		doc.participants.includes(req.user.id)
	) {
		return res.status(200).json(doc);
	}

	return next(
		new AppError('You do not have permission to access this document', 403)
	);
});

exports.revokeAccess = catchAsync(async (req, res, next) => {
	const docId = req.params.docId;
	const email = req.body.email;

	if (!docId || !email) {
		return next(new AppError('Document ID and email are required', 400));
	}

	const doc = await Doc.findOne({ uuid: docId })
		.populate('creator', 'name email')
		.populate('participants', 'name email')
		.select('-data -chatMessages -__v');

	if (!doc) {
		return next(new AppError('Document not found', 404));
	}

	if (!doc.creator._id.equals(req.user._id)) {
		return next(
			new AppError('Only the document creator can revoke access', 403)
		);
	}

	if (doc.creator.email === email) {
		return next(
			new AppError('Creator cannot revoke their own access', 400)
		);
	}

	const participantIndex = doc.participants.findIndex(
		(p) => p.email === email
	);
	if (participantIndex === -1) {
		return next(new AppError('Participant not found', 404));
	}

	doc.participants.splice(participantIndex, 1);

	await doc.save({ validateBeforeSave: false });

	const data = {
		uuid: doc.uuid,
		title: doc.title,
		creator: doc.creator ? doc.creator.name : 'Unknown',
		participants: doc.participants.map((participant) => ({
			name: participant.name,
			email: participant.email,
		})),
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt,
	};

	res.status(200).json(data);
});

exports.addParticipant = catchAsync(async (req, res, next) => {
	const docId = req.params.docId;
	const email = req.body.email;

	if (!docId || !email) {
		return next(new AppError('Document ID and email are required', 400));
	}

	const user = await User.findOne({ email }).select(
		'-password -active -createdAt -updatedAt -__v'
	);

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	const doc = await Doc.findOne({ uuid: docId })
		.populate('creator', 'name')
		.populate({
			path: 'participants',
			select: 'name email -_id',
		})
		.select('-data -chatMessages -createdAt -__v');

	if (!doc) {
		return next(new AppError('Document does not exist', 404));
	}

	if (doc.creator._id.toString() !== req.user.id) {
		return next(
			new AppError('Only the document creator can add participants', 403)
		);
	}

	if (
		doc.participants.some((participant) => participant.email === user.email)
	) {
		return next(new AppError('User is already a participant', 400));
	}

	doc.participants.push(user);
	await doc.save({ validateBeforeSave: false });

	const updatedDoc = await Doc.findOne({ uuid: docId })
		.populate('creator', 'name')
		.populate({
			path: 'participants',
			select: 'name email -_id',
		})
		.select('-data -chatMessages -createdAt -__v');

	const data = {
		uuid: updatedDoc.uuid,
		title: updatedDoc.title,
		creator: updatedDoc.creator.name,
		participants: updatedDoc.participants,
		updatedAt: updatedDoc.updatedAt,
	};
	res.status(200).json(data);
});

exports.deleteDoc = catchAsync(async (req, res, next) => {
	const doc = await Doc.findOne({ uuid: req.params.docId }).populate(
		'creator'
	);

	if (!doc) {
		return next(new AppError('Document not found', 404));
	}

	const { email, _id: userId } = req.user;

	if (doc.creator.email === email) {
		await doc.deleteOne();
		return res.status(204).end();
	}

	if (doc.participants.includes(userId)) {
		doc.participants = doc.participants.filter(
			(participantId) => !participantId.equals(userId)
		);
		if (doc.participants.length === 0) {
			await doc.deleteOne();
		} else {
			await doc.save({ validateBeforeSave: false });
		}

		return res.status(204).end();
	}

	return next(
		new AppError('You do not have permission to delete this document', 403)
	);
});

exports.changeTitle = catchAsync(async (req, res, next) => {
	const { docId } = req.params;
	const { title } = req.body;

	if (!docId || !title) {
		return next(new AppError('Document ID and title are required', 400));
	}

	const doc = await Doc.findOne({ uuid: docId }).select(
		'-data -chatMessages -_id -__v'
	);

	if (!doc) {
		return next(new AppError('Document does not exist', 404));
	}

	if (doc.creator.toString() !== req.user.id) {
		return next(
			new AppError('Only the document creator can change the title', 403)
		);
	}

	doc.title = title;
	await doc.save({ validateBeforeSave: false });

	res.status(200).json('Title updated successfully');
});

exports.saveDocument = catchAsync(async (documentID, data) => {
	if (!data || typeof data !== 'object' || !Array.isArray(data.ops)) {
		return new AppError('Invalid data format', 400);
	}

	const doc = await Doc.findOne({ uuid: documentID });
	if (!doc) {
		throw new AppError('Document not found', 404);
	}

	doc.data = data;
	await doc.save();
});

exports.deleteAllDocs = async (req, res, next) => {
	await Doc.deleteMany({});
	res.status(204).send('All documents deleted');
};

exports.getAllDocs = async (req, res, next) => {
	const docs = await Doc.find();
	res.status(200).json({
		results: docs.length,
		data: {
			docs,
		},
	});
};
