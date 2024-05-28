const client = require('prom-client');

// Create a counter metric
const requestCounter = new client.Counter({
	name: 'http_requests_total',
	help: 'Total number of HTTP requests',
	labelNames: ['method', 'route', 'status_code'],
});

module.exports = requestCounter;
