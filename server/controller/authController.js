const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('./../utils/email');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const sendCookie = (res, token) => {
	const cookieOptions = {
		maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: 'Lax',
	};
	if (process.env.ENVIROMENT === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	const token = generateToken(newUser._id);
	sendCookie(res, token);

	await new Email(newUser, '').sendWelcome();

	const { password: userPassword, ...userData } = newUser.toObject();

	res.status(201).json(userData);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: 'Please provide a email or password' });
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	const token = generateToken(user._id);
	sendCookie(res, token);

	const { password: userPassword, ...userData } = user.toObject();

	res.status(200).json(userData);
});

exports.logout = async (req, res, next) => {
	res.cookie('jwt', '', {
		maxAge: 0,
		httpOnly: true,
	});
	res.status(200).send('User is logout');
};

exports.updatePassword = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	if (!user) {
		return next(new AppError('User does not Exist!', 401));
	}

	if (!(await user.correctPassword(req.body.currPassword, user.password))) {
		return next(new AppError('Wrong Password!', 401));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	await user.save();

	const token = generateToken(user.id);
	sendCookie(res, token);

	res.status(200).send('Password updated successfully');
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('There is no user with Email address.', 404));
	}

	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	try {
		const resetURL = `${req.protocol}://${req.get(
			'host'
		)}/api/v1/user/resetPassword/${resetToken}`;

		await new Email(user, resetURL).sendPasswordReset();

		res.status(200).json(req.body.email);
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		return next(
			new AppError(
				'There was an Error sending the email. Try again later!',
				500
			)
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	const hashToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashToken,
		passwordResetExpires: { $gt: Date.now() },
	});
	if (!user) {
		return next(new AppError('Token is invalid or has expired', 400));
	}

	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	const token = generateToken(user._id);
	sendCookie(res, token);

	res.status(200).json({
		status: 'success',
		token,
	});
});
