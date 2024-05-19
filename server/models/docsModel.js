const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
	{
		_id: String,
		data: Object,
	},
	{ timestamps: true }
);

const Doc = mongoose.model('Doc', docSchema);
module.exports = Doc;
