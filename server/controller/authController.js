const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/userModel');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const sendCookie = (res, token) => {
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	if (process.env.ENVIROMENT === 'production') cookieOptions.secure = true;
	res.cookie('jwt', token, cookieOptions);
};

exports.signup = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		const token = generateToken(newUser._id);
		sendCookie(res, token);
		res.status(200).json({
			status: 'success',
			token,
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ error: 'Please provide a email or password' });
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({ error: 'Incorrect email or password' });
	}

	const token = generateToken(user._id);
	sendCookie(res, token);

	res.status(200).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.logout = async (req, res, next) => {
	res.cookie('jwt', '', {
		httpOnly: true,
	});
	res.status(200).send('User is logout');
};

exports.protect = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			throw new Error('You are not logged in! Please log in');
		}

		const decoded = await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		);

		const currentUser = await User.findById(decoded.id);
		if (!currentUser) {
			throw new Error('User does not exist');
		}

		req.user = currentUser;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(401).json({
			status: 'failed',
			error: err.message,
		});
	}
};
