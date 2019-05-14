const tcp = require('./tcp');
const os = require('os');

const tcpClient = tcp.createClient(3000, send => {
	console.log('connected to server');

	// setInterval(() => {
	console.time('request');
	send(
		{
			message: `hello from ${os.hostname()}`
		},
		(err, message) => {
			console.timeEnd('request');
		}
	);
	// }, 1000);
});

tcpClient.on('error', err => console.log('%j', err));
