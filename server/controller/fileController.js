const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const User = require('./../models/userModel');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

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
	console.log('hrlfefewlo');
	const updateData = { ...req.body };

	if (!req.files || !req.files['pdf'])
		return next(new AppError('No File Found'));

	const getUserPdf = await User.findById(req.user._id);

	if (getUserPdf && getUserPdf.pdf) {
		fs.unlink(getUserPdf.pdf, (err) => {
			if (err) {
				return next(new AppError('Error deleting PDF:', 400));
			} else {
				console.log('Previous PDF file deleted successfully');
			}
		});
	}
	updateData.pdf = req.files['pdf'][0].path;

	const user = await User.findByIdAndUpdate(req.user._id, updateData, {
		new: true,
		runValidators: true,
	});

	const file = req.files['pdf'][0].path;
	const data = await pdfReader(file);

	console.log('hrllo');

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
