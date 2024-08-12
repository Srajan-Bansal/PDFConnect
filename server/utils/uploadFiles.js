const multer = require('multer');
const path = require('path');
const AppError = require('./appError');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.mimetype.startsWith('image')) {
			cb(null, path.join(__dirname, '../public/img'));
		} else if (file.mimetype === 'application/pdf') {
			cb(null, path.join(__dirname, '../public/pdf'));
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
	if (
		file.mimetype === 'application/pdf' ||
		file.mimetype.startsWith('image')
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: fileFilter,
});

const uploadFilesMiddleware = (req, res, next) => {
	try {
		upload.fields([
			{ name: 'photo', maxCount: 1 },
			{ name: 'pdf', maxCount: 1 },
		])(req, res, (err) => {
			if (err) {
				return next(
					new AppError('Error in upload Middleware fields', 500)
				);
			}
			next();
		});
	} catch (err) {
		return next(new AppError('Error in upload Middleware', 500));
	}
};

module.exports = uploadFilesMiddleware;
