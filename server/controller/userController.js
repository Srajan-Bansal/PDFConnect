const fs = require('fs');
const User = require('./../models/userModel');

// exports.updateMe = async (req, res, next) => {
// 	try {
// 		if (req.files && req.files['photo']) {
// 	}
// };

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
