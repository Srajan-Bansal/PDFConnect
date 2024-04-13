const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');

exports.signup = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});

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

	const token = '';
	res.status(200).json({
		status: 'success',
		token,
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
