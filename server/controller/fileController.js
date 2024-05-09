const { PDFLoader } = require('langchain/document_loaders/fs/pdf');
const User = require('./../models/userModel');
const fs = require('fs');

exports.uploadPhoto = async (req, res, next) => {
	try {
		const updateData = { ...req.body };

		if (req.files && req.files['photo']) {
			const getUserPhoto = await User.findById(req.user._id);
			if (getUserPhoto && getUserPhoto.photo) {
				fs.unlink(getUserPhoto.photo, (err) => {
					if (err) {
						res.status(400).json({
							status: 'Error deleting photo:',
							err: err.message,
						});
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
	} catch (err) {
		res.status(400).json(err.message);
	}
};

exports.uploadPDF = async (req, res) => {
	try {
		const updateData = { ...req.body };

		if (req.files && req.files['pdf']) {
			const getUserPdf = await User.findById(req.user._id);
			if (getUserPdf && getUserPdf.pdf) {
				fs.unlink(getUserPdf.pdf, (err) => {
					if (err) {
						res.status(400).json({
							status: 'Error deleting PDF:',
							err: err.message,
						});
					} else {
						console.log('Previous PDF file deleted successfully');
					}
				});
			}
			updateData.pdf = req.files['pdf'][0].path;
		}

		const user = await User.findByIdAndUpdate(req.user._id, updateData, {
			new: true,
			runValidators: true,
		});

		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

const pdfReader = async (path) => {
	try {
		const loader = new PDFLoader(path, {
			splitPages: false,
			// parsedItemSeparator: '',
		});
		const docs = await loader.load();
		return docs;
	} catch (err) {
		console.error(err.message);
	}
};

exports.getTextFromPDF = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user.pdf) {
			res.status(400).json({
				status: 'No pdf found',
			});
		}
		// const filePath = path.join(__dirname, '../uploads/pdf', 'JAVA.pdf');
		const docs = await pdfReader(user.pdf);

		res.status(200).json(docs);
	} catch (err) {
		res.status(400).json(err.message);
	}
};
