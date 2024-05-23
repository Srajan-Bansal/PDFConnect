const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.ENVIROMENT === 'development') {
	app.use(morgan('dev'));
}

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL_MOBILE,
	})
);

app.use(cookieParser());
app.use(express.json());

const rateLimiter = new RateLimiterMemory({
	points: process.env.EXTRACT_API_THROTTLING_LIMIT, // 2 requests
	duration: process.env.EXTRACT_API_THROTTLING_DURATION, // per 10 seconds
});

const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter
		.consume(req.ip)
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).send(
				'Too many requests, please try again after 10 seconds.'
			);
		});
};
app.use('/getDataFromPDF', rateLimiterMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/', pdfRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

// 404 Not Found Middleware
app.use('*', (req, res, next) => {
	res.status(404).json({
		status: 'failed',
		message: '404 page not found',
	});
});

module.exports = app;
