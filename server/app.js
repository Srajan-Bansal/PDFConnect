const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.ENVIROMENT === 'development') {
	app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', userRoutes);

app.use('*', (req, res, next) => {
	res.status(404).json({
		status: 'failed',
		message: '404 page not found',
	});
});

module.exports = app;
