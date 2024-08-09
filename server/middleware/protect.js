const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const protect = catchAsync(async (req, res, next) => {
	const token = req.cookies.jwt;
	if (!token) {
		return next(new AppError('You are not logged in! Please log in'));
	}

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(new AppError('User does not exist'));
	}

	req.user = currentUser;
	next();
});

module.exports = protect;
