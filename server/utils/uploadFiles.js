const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.mimetype.startsWith('image')) {
			cb(null, path.join(__dirname, '../uploads/img'));
		} else if (file.mimetype === 'application/pdf') {
			cb(null, path.join(__dirname, '../uploads/pdf'));
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

module.exports = upload;
