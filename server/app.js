const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const client = require('prom-client');
const metricsMiddleware = require('./monitoring/monitor');

const pdfRoutes = require('./routes/pdfRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// MIDDLEWARES
if (process.env.ENVIROMENT === 'development') {
	app.use(morgan('dev'));
}

app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
);

// Set security HTTP headers
app.use(helmet());

app.use(metricsMiddleware);

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

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use('/', (req, res, next) => {
	res.json({
		status: 200,
		mess: 'good',
	});
});

// Monitoring
app.get('/metrics', async (req, res) => {
	const metrics = await client.register.metrics();
	res.set('Content-Type', client.register.contentType);
	res.end(metrics);
});

// ROUTES
app.use('/api/v1/user', userRoutes);
app.use('/', pdfRoutes);
app.use('/', chatRoutes);

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
