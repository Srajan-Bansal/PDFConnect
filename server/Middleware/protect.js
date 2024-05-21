const User = require('./../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
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

module.exports = protect;
