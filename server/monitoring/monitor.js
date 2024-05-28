const requestCounter = require('./requestCount');
const activeRequestsGauge = require('./activeRequests');
const httpRequestDurationMicroseconds = require('./requestTime');

const metricsMiddleware = (req, res, next) => {
	const startTime = Date.now();
	activeRequestsGauge.inc();

	res.on('finish', function () {
		const endTime = Date.now();
		const duration = endTime - startTime;

		// Increment request counter
		requestCounter.inc({
			method: req.method,
			route: req.path,
			status_code: res.statusCode,
		});

		httpRequestDurationMicroseconds.observe(
			{
				method: req.method,
				route: req.path,
				code: res.statusCode,
			},
			duration
		);

		setTimeout(() => {
			activeRequestsGauge.dec();
		}, 10000);
	});
	next();
};

module.exports = metricsMiddleware;
