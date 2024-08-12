const express = require('express');
const User = require('./../models/userModel');
const Doc = require('./../models/docsModel');
const AppError = require('./../utils/appError');

const router = express.Router();

router.post('/saveDocToUser', async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return next(new AppError('No User Exits!', 400));
		}

		const doc = await Doc.findById(req.body.docId);
		if (!doc) {
			return next(new AppError('No Document Exist!', 400));
		}

		doc.participants.forEach((e) => {
			if (e === user.id) {
				res.status(200).json(doc);
			}
		});

		doc.participants.push(user.id);
		await doc.save({ validateBeforeSave: false });

		res.status(200).json(doc);
	} catch (err) {
		console.log(err);
		res.json(err);
	}
});

module.exports = router;
