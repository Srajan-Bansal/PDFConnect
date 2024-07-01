const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_APIKEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

let Chats = {
	history: [],
	generationConfig: {
		maxOutputTokens: 1000,
	},
};

const generativeText = async (req, res, next) => {
	try {
		const userChat = {
			role: 'user',
			parts: [
				{
					text: req.body.prompt,
				},
			],
		};
		Chats.history.push(userChat);

		const chat = model.startChat(Chats);

		const result = await chat.sendMessage(req.body.prompt);
		const text = result.response.text();

		const modelChat = {
			role: 'model',
			parts: [
				{
					text: text,
				},
			],
		};
		Chats.history.push(modelChat);

		// console.log(Chats);
		res.status(200).send(text);
	} catch (err) {
		// console.log(err);
		res.status(404).json({
			status: 'failed',
			err: err.message || 'Unknown error occurred',
		});
	}
};

module.exports = generativeText;
