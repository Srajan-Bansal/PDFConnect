const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please tell us your name'],
		},
		email: {
			type: String,
			required: [true, 'Please tell us your email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
		photo: String,
		pdf: String,
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minLength: 3,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				// This only works on CREATE and SAVE!!!
				validator: function (el) {
					return el === this.password;
				},
			},
		},
		passwordResetToken: String,
		passwordResetExpires: Date,
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 8);

	this.passwordConfirm = undefined;
	next();
});

UserSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

UserSchema.methods.correctPassword = async (
	candidatePassword,
	userPassword
) => {
	return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
