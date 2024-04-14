const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
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
	res.status(200).json({
		status: 'success',
		token,
	});
};

exports.protect = async (req, res, next) => {
	try {
		let token;
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			token = req.headers.authorization.split(' ')[1];
		}

		if (!token) {
			const error = new Error(
				'You are not logged in! Please log in to get access'
			);
			error.status = 401;
			return next(error);
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const currUser = await User.findById({ _id: decoded.id });
		if (!currUser) {
			return res.status(200).json({
				status: 'Failed',
				Error: 'USERS NO LONGER EXIST',
			});
		}

		req.user = currUser;
		next();
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			ERROR: err.message,
		});
	}
};
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWI3MDFjNzkzZDBmOTExMmVhY2M2ZiIsImlhdCI6MTcxMzA3NDIwNCwiZXhwIjoxNzEzMDc0MjE0fQ.v8gw_jgKjdk4N6n6Ng7kTRq_EB4LY5Gga9P5jEly9vIeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWI3MDFjNzkzZDBmOTExMmVhY2M2ZiIsImlhdCI6MTcxMzA3NDIwNCwiZXhwIjoxNzEzMDc0MjE0fQ.v8gw_jgKjdk4N6n6Ng7kTRq_EB4LY5Gga9P5jEly9vI

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
