const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json({
			result: users.length,
			users,
		});
	} catch {
		res.status(404).json(err.message);
	}
};

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm)
		return next(
			new AppError(
				'This route is not for password updates. Please use /updateMyPassword.',
				400
			)
		);

	const filterdBody = filterObj(req.body, 'name', 'email');

	const updatedUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json(updatedUser);
});

exports.deleteAllUsers = async (req, res, next) => {
	try {
		await User.deleteMany({});

		res.status(200).send('All users are deleted');
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteMe = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.user.id, { active: false });
	res.status(200).json(null);
});
