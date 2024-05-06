const jwt = require('jsonwebtoken');
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

	if (!user || !(await user.correctPassword(password, user.password)))
		return res.status(401).json({ error: 'Incorrect email or password' });

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

exports.protect = async (req, res, next) => {
	try {
		let token;
		// if (
		// 	req.headers.authorization &&
		// 	req.headers.authorization.startsWith('Bearer')
		// ) {
		// 	token = req.headers.authorization.split(' ')[1];
		// }
		if (req.cookies.jwt) {
			// console.log(req.cookies.jwt);
			token = req.cookies.jwt;
		}

		if (!token) {
			return res.status(401).json({
				status: 'failed',
				error: 'You are not logged in! Please log in',
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const currUser = await User.findById(decoded.id);
		if (!currUser) {
			return res.status(404).json({
				status: 'failed',
				error: 'User no longer exists',
			});
		}

		req.user = currUser;
		next();
	} catch (err) {
		console.error('Error in protect middleware:', err);
		res.status(500).json({
			status: 'error',
			message: 'Internal server error',
		});
	}
};
