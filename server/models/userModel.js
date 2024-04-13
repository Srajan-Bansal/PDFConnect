const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 8);

	this.passwordConfirm = undefined;
	next();
});

UserSchema.methods.correctPassword = async (loginPassword, userPassword) => {
	return await bcrypt.compare(loginPassword, userPassword);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
