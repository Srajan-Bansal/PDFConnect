const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const User = require('./../models/userModel');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const pdfReader = async (path) => {
	try {
		const loader = new PDFLoader(path, {
			splitPages: false,
			// parsedItemSeparator: '',
		});
		const docs = await loader.load();
		return docs;
	} catch (err) {
		console.log('Error in pdf reader');
		return next(new AppError('Error in pdf reader', 500));
	}
};

exports.uploadPDF = catchAsync(async (req, res, next) => {
	const file = req.files['pdf'][0].path;
	if (!file) return next(new AppError('No file Found', 400));
	const data = await pdfReader(file);
	if (!data) return next(new AppError('Unable to read data', 500));

	res.status(200).json(data);
});

exports.uploadPhoto = catchAsync(async (req, res, next) => {
	const updateData = { ...req.body };

	if (req.files && req.files['photo']) {
		const getUserPhoto = await User.findById(req.user._id);
		if (getUserPhoto && getUserPhoto.photo) {
			fs.unlink(getUserPhoto.photo, (err) => {
				if (err) {
					return next(new AppError('Error deleting Photo', 400));
				} else {
					console.log('Previous photo deleted successfully');
				}
			});
		}
		updateData.photo = req.files['photo'][0].path;
	}

	const user = await User.findByIdAndUpdate(req.user._id, updateData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json(user);
});
