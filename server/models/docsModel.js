const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
	{
		_id: String,
		data: Object,
	},
	{ timestamps: true }
);

// TTL - Time to Live
docSchema.index({ createdAt: 1 }, { expireAfterSeconds: 21600 });

const Doc = mongoose.model('Doc', docSchema);
module.exports = Doc;
