const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
	{
		uuid: {
			type: String,
			required: [true, 'Please provide a uuid for document'],
			unique: true,
		},
		title: {
			type: String,
			required: [true, 'Please provide a title for document'],
			unique: true,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide a creator for document'],
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		data: Object,
		chatMessages: [
			{
				sender: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				message: String,
				timestamp: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true }
);

// TTL - Time to Live
docSchema.index({ uuid: 1 });

const Doc = mongoose.model('Doc', docSchema);
module.exports = Doc;
