const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
	{
		uuid: {
			type: String,
			required: [true, 'Please provide a uuid for document'],
			unique: true,
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		title: String,
		data: Object,
	},
	{ timestamps: true }
);

// TTL - Time to Live
docSchema.index({ uuid: 1 }, { expireAfterSeconds: 21600 });
// docSchema.index({ createdAt: 1 }, );

const Doc = mongoose.model('Doc', docSchema);
module.exports = Doc;
