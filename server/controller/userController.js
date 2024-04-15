const multer = require('multer');
const fs = require('fs');
const User = require('./../models/userModel');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.mimetype.startsWith('image')) {
			cb(null, 'public/img/users');
		} else if (file.mimetype === 'application/pdf') {
			cb(null, 'public/pdf/users');
		} else {
			cb(new Error('Unsupported file type'));
		}
	},
	filename: (req, file, cb) => {
		let extension = '';
		if (file.mimetype.startsWith('image')) {
			extension = 'jpeg';
		} else if (file.mimetype === 'application/pdf') {
			extension = 'pdf';
		}
		cb(null, `user-${req.user._id}-${Date.now()}.${extension}`);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: fileFilter,
});

exports.uploadFiles = (req, res, next) => {
	upload.fields([
		{ name: 'photo', maxCount: 1 },
		{ name: 'pdf', maxCount: 1 },
	])(req, res, (err) => {
		if (err) {
			return res.status(400).json({
				status: 'failed',
				error: err.message,
			});
		}
		next();
	});
};

exports.updateMe = async (req, res, next) => {
	try {
		const updateData = { ...req.body };

		if (req.files && req.files['photo']) {
			const getUserPhoto = await User.findById(req.user._id);
			if (getUserPhoto && getUserPhoto.photo) {
				fs.unlink(getUserPhoto.photo, (err) => {
					if (err) {
						console.error('Error deleting photo:', err);
					} else {
						console.log('Previous PDF file deleted successfully');
					}
				});
			}
			updateData.photo = req.files['photo'][0].path;
		}

		if (req.files && req.files['pdf']) {
			const getUserPdf = await User.findById(req.user._id);
			if (getUserPdf && getUserPdf.pdf) {
				fs.unlink(getUserPdf.pdf, (err) => {
					if (err) {
						console.error('Error deleting file:', err);
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
		res.status(200).json({
			status: 'success',
			data: {
				user,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			error: err.message,
		});
	}
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find({});

		res.status(200).json({
			status: 'success',
			result: users.length,
			data: {
				users,
			},
		});
	} catch {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.deleteAllUsers = async (req, res, next) => {
	try {
		await User.deleteMany({});

		res.status(200).json({
			status: 'success',
			message: 'All users are deleted',
		});
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		});
	}
};
