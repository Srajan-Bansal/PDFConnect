const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

// ROUTES
app.use('/', userRoutes);

app.use('*', (req, res, next) => {
	res.status(404).json({
		status: 'failed',
		message: '404 page not found',
	});
});

module.exports = app;
