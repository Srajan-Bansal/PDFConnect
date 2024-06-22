const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_APIKEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const generativeText = async (req, res, next) => {
	try {
		const prompt = req.body.prompt;
		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = await response.text();

		res.status(200).send(text);
	} catch (err) {
		res.status(200).json({
			status: 'failed',
			err: err.message || 'Unknown error occurred',
		});
	}
};

module.exports = generativeText;
