// const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const User = require('./../models/userModel');
const fs = require('fs');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const pdfParse = require('pdf-parse');

// const pdfReader = async (path) => {
// 	try {
// 		const loader = new PDFLoader(path, {
// 			splitPages: false,
// 			// parsedItemSeparator: '',
// 		});
// 		const docs = await loader.load();
// 		return docs;
// 	} catch (err) {
// 		console.log('Error in pdf reader');
// 		return next(new AppError('Error in pdf reader', 500));
// 	}
// };

exports.uploadPDF = async (req, res) => {
	try {
		const pdfBuffer = req.file.buffer;

		const data = await pdfParse(pdfBuffer);

		res.json({
			text: data.text,
			meta: data.info,
		});
	} catch (error) {
		res.status(500).send({ error: 'Failed to process the PDF' });
	}
};

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
