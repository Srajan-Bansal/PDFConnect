const multer = require('multer');
const User = require('./../models/userModel');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/img/users');
	},
	filename: (req, file, cb) => {
		// user-id-Date.now().jpeg
		const extension = file.mimetype.split('/')[1];
		if (file.mimetype.startsWith('image')) {
			cb(null, `user-${req.user._id}-${Date.now()}.${extension}`);
		} else {
			cb(new Error('Not an image! Please provide an image'), false);
		}
	},
});

const upload = multer({
	storage: multerStorage,
});

exports.uploadUserPhoto = (req, res, next) => {
	upload.single('photo')(req, res, (err) => {
		if (err) {
			return res.status(400).json({
				status: 'failed',
				error: err.message,
			});
		}
		res.status(200).json({
			status: 'success',
			body: req.body,
			file: req.file,
		});
	});
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
