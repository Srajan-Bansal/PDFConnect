const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.ENVIROMENT === 'development') {
	app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173',
	})
);
app.options('*', cors());

app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	// console.log(req.cookies);
	next();
});

// ROUTES
app.use('/api/v1/user', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
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
