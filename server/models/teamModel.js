const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		// version control
		content: {
			type: String,
			default: '',
		},
		// Track users who have access to the document
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
);

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
