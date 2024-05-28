const client = require('prom-client');

const activeRequestsGauge = new client.Gauge({
	name: 'active_requests',
	help: 'Number of active requests',
});

module.exports = activeRequestsGauge;
